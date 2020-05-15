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


        [HttpDelete]
        [Route("removecomment/{id}")]
        public ActionResult RemoveComment(string id)
        {
            var currComment = _uow.Comments.Find(x => x.Id == new ObjectId(id)).FirstOrDefault();
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);


            if (currComment.UserId == currUserId)
            {
                _uow.Comments.Delete(currComment);
                var currPost = _uow.Posts.Find(x => x.Id == currComment.PostId).FirstOrDefault();

                currPost.Comments.Remove(currComment.Id);
                _uow.Posts.Edit(currPost);


                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }


        [HttpPost]
        [Route("editcomment")]
        public ActionResult EditComment([FromBody]CommentDto commentDto)
        {
            var currComment = _uow.Comments.Find(x => x.Id == new ObjectId(commentDto.Id)).FirstOrDefault();
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);

            if (currComment.UserId == currUserId)
            {

                currComment.Text = commentDto.Text;

                _uow.Comments.Edit(currComment);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }


        [HttpGet]
        [Route("getusercomments")]
        public ActionResult GetUserComments()
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var comments = _uow.Comments.GetAll().Where(i => i.UserId == currUserId);
            var commentstoReturn = _mapper.Map<IEnumerable<CommentDto>>(comments);
            return Ok(commentstoReturn);
        }

    }
}