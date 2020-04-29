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
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        private readonly IMongoCollection<Comment> _comments;

        public CommentRepository(ISocialMediaDBSettings settings) : base(settings)
        {
            var db = ConnectDB.Connect(settings);
            _comments = db.GetCollection<Comment>("Comments");
        }
    }
}
