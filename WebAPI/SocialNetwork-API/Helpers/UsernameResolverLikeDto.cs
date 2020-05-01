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
    public class UsernameResolverLikeDto : IValueResolver<Like, LikeDto, string>
    {
        private IUnitOfWork _uow;

        public UsernameResolverLikeDto(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public string Resolve(Like source, LikeDto destination, string destMember, ResolutionContext context)
        {
            return _uow.Users.GetUser(source.UserId).Username;
        }
    }
}
