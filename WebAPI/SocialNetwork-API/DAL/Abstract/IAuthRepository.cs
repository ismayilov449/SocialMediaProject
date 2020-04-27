using MongoDB.Bson;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Abstract
{
    public interface IAuthRepository
    {

        ObjectId GetUserId(string username);
        User GetUser(ObjectId objectId);
        void UpdateUser(User user, ObjectId id);
        Task<User> Register(User user, string password);
        Task<User> Login(string userName, string password);
        Task<bool> UserExists(string userName);

    }
}
