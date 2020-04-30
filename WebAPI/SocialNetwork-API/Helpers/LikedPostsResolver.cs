using AutoMapper;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Helpers
{
    public class LikedPostsResolver : IValueResolver<Like, LikeDto, ICollection<Post>>
    {
        private IUnitOfWork _uow;

        public LikedPostsResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public ICollection<Post> Resolve(Like source, LikeDto destination, ICollection<Post> dest, ResolutionContext context)
        {
            var likes = _uow.Likes.Find(x => x.UserId == source.UserId).ToList();
            var likedPosts = new List<Post>();

            foreach (var likedpost in likes)
            {
                likedPosts.Add(_uow.Posts.Find(x => x.Id == likedpost.PostId).FirstOrDefault());
            }

            return likedPosts;
        }
    }
}
