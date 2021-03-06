﻿using AutoMapper;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Helpers
{
    public class ListCommentsResolver : IValueResolver<Post, PostDto, List<CommentDto>>
    {
        private IUnitOfWork _uow;
        private IMapper _mapper;

        public ListCommentsResolver(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public List<CommentDto> Resolve(Post source, PostDto destination, List<CommentDto> destMember, ResolutionContext context)
        {
            var comments = _uow.Comments.GetAll().Where(i => i.PostId == source.Id);
            comments = comments.OrderByDescending(i => i.SharedTime);
            return _mapper.Map<IEnumerable<CommentDto>>(comments).ToList();
        }

    }
}
