using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.MongoDB
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ISocialMediaDBSettings settings;

        public UnitOfWork(ISocialMediaDBSettings _settings)
        {
            settings = _settings;
        }

        public IPostRepository _posts { get; set; }

        public IAuthRepository _users { get; set; }

        public ICommentRepository _comments { get; set; }

        public ILikeRepository _likes { get; set; }

        public IPostRepository Posts
        {
            get
            {
                return _posts ?? (_posts = new PostRepository(settings));
            }
        }

        public IAuthRepository Users
        {
            get
            {
                return _users ?? (_users = new AuthRepository(settings));
            }
        }

        public ICommentRepository Comments
        {
            get
            {
                return _comments ?? (_comments = new CommentRepository(settings));
            }
        }

        public ILikeRepository Likes
        {
            get
            {
                return _likes ?? (_likes = new LikeRepository(settings));
            }
        }


    }
}
