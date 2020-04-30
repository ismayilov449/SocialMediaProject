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
    public class LikeRepository : GenericRepository<Like>, ILikeRepository
    {
        private readonly IMongoCollection<Like> _likes;

        public LikeRepository(ISocialMediaDBSettings settings) : base(settings)
        {
            var db = ConnectDB.Connect(settings);
            _likes = db.GetCollection<Like>("Likes");
        }
    }
}
