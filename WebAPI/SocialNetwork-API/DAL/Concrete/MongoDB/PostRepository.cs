using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Helpers;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.MongoDB
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        private readonly IMongoCollection<Post> _posts;

        public PostRepository(ISocialMediaDBSettings settings) : base(settings)
        {
            var db = ConnectDB.Connect(settings);
            _posts = db.GetCollection<Post>("Posts");
        }

        public List<Post> GetPostsByUserId(ObjectId objectId)
        {
            var posts = _posts.Find(x => x.UserId == objectId).ToList();
            return posts;
        }
    }
}
