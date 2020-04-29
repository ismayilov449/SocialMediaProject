using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Models;

namespace SocialNetwork_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public CommentController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("addcomment")]
        public ActionResult AddComment([FromBody]CommentDto commentDto)
        {
            var currUserId = _uow.Users.GetUserId(User.Identity.Name);
            commentDto.UserId = currUserId.ToString();

            var currComment = _mapper.Map<Comment>(commentDto);


            _uow.Comments.Add(currComment);

            var currPost = _uow.Posts.Find(x => x.Id == currComment.PostId).FirstOrDefault();
            if (currPost.Comments != null)
            {
                currPost.Comments.Add(currComment.Id);
            }
            else
            {
                currPost.Comments = new List<ObjectId>();
                currPost.Comments.Add(currComment.Id);
            }

            _uow.Posts.Edit(currPost);

            return Ok(currComment);
        }


    }
}