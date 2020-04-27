using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Helpers;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.MongoDB
{
    public class AuthRepository : IAuthRepository
    {
        private IMongoCollection<User> _users { get; set; }
        public AuthRepository(ISocialMediaDBSettings settings)
        {
            var db = ConnectDB.Connect(settings);
            _users = db.GetCollection<User>("Users");
        }

        public void UpdateUser(User user, ObjectId id)
        {

            _users.FindOneAndUpdate<User>(
                Builders<User>.Filter.Eq("Id", id),
                Builders<User>.Update.
                Set("Username", user.Username).
                Set("ImgId", user.ImgId).
                Set("Posts", user.Posts).
                Set("Likes", user.Likes));

        }

        public User GetUser(ObjectId objectId)
        {
            return _users.Find(x => x.Id == objectId).FirstOrDefault();
        }

        public ObjectId GetUserId(string username)
        {
            return _users.Find(x => x.Username == username).FirstOrDefault().Id;
        }

        public async Task<User> Login(string userName, string password)
        {

            var user = await _users.Find(x => x.Username == userName).FirstAsync();


            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;

        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _users.InsertOneAsync(user);

            return user;
        }

        public async Task<bool> UserExists(string userName)
        {
            if (await _users.Find(x => x.Username == userName).CountDocumentsAsync() > 0)
            {
                return true;
            }

            return false;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {

                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }

                }
                return true;
            }
        }
    }
}
