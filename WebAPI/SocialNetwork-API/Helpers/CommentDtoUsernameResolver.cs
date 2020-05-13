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
    public class CommentDtoUsernameResolver : IValueResolver<Comment, CommentDto, string>
    {
        private IUnitOfWork _uow;

        public CommentDtoUsernameResolver(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public string Resolve(Comment source, CommentDto destination, string destMember, ResolutionContext context)
        {
            return _uow.Users.GetUsername(source.UserId);
        }
    }
}
