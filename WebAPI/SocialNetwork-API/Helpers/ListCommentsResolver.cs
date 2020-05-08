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
    public class ListCommentsResolver : IValueResolver<Post, PostDetailsDto, ICollection<CommentDto>>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;

        public ListCommentsResolver(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public ICollection<CommentDto> Resolve(Post source, PostDetailsDto destination, ICollection<CommentDto> destMember, ResolutionContext context)
        {
            var comments = _uow.Comments.GetAll().Where(i => i.PostId == source.Id);
            return _mapper.Map<IEnumerable<CommentDto>>(comments).ToList();
        }
    }
}
