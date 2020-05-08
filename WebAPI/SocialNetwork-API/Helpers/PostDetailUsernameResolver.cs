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
    public class PostDetailUsernameResolver : IValueResolver<Post, PostDto, List<LikeDto>>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;


        public PostDetailUsernameResolver(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public List<LikeDto> Resolve(Post source, PostDto destination, List<LikeDto> destMember, ResolutionContext context)
        {
            var likes = _uow.Likes.GetAll().Where(i => i.PostId == source.Id).ToList();
            var forReturn = _mapper.Map<List<LikeDto>>(likes);


            return forReturn;

        }
    }
}
