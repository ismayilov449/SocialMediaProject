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
    public class PostDetailLikeResolver : IValueResolver<Post, PostDetailsDto, ICollection<LikeDto>>
    {

        private IUnitOfWork _uow;
        private IMapper _mapper;


        public PostDetailLikeResolver(IUnitOfWork uow, IMapper mapper) { _uow = uow; _mapper = mapper; }



        public ICollection<LikeDto> Resolve(Post source, PostDetailsDto destination, ICollection<LikeDto> destMember, ResolutionContext context)
        {
            var likes = _uow.Likes.GetAll().Where(i => i.PostId == source.Id);
            var forReturn = _mapper.Map<ICollection<LikeDto>>(likes).ToList();

            return forReturn;
        }


    }
}
