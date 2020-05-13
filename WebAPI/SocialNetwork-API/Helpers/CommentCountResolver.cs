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
    public class CommentCountResolver : IValueResolver<Post, PostDto, int>
    {
        private IUnitOfWork _uow;

        public CommentCountResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public int Resolve(Post source, PostDto destination, int destMember, ResolutionContext context)
        {
            return _uow.Posts.Get(source.Id).Comments is null ? 0 : _uow.Posts.Get(source.Id).Comments.Count();
        }
    }
}
