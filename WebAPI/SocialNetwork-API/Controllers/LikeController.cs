using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Models;

namespace SocialNetwork_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private IUnitOfWork _uow;
        private IConfiguration _configuration;
        private IMapper _mapper;

        public LikeController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
            _configuration = configuration;
        }



        [HttpGet]
        [Route("getpostlikes/{postId}")]
        public ActionResult GetPostLikes(string postId)
        {
            var likes = _uow.Likes.Find(x => x.PostId == new ObjectId(postId)).ToList();
            var postsToReturn = _mapper.Map<IEnumerable<LikeDto>>(likes);


            return Ok(postsToReturn);
        }

        [HttpGet]
        [Route("getuserlikes/{userId}")]
        public ActionResult GetUserLikes(string userId)
        {

            var likes = _uow.Likes.Find(x => x.UserId == new ObjectId(userId)).ToList();

            var postsToReturn = _mapper.Map<IEnumerable<LikeDto>>(likes);

            return Ok(postsToReturn);
        }

        [HttpPost]
        [Route("like/{postId}")]
        public ActionResult Like(string postId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currLike = new Like()
            {
                PostId = new ObjectId(postId),
                UserId = currUserId
            };

            if (_uow.Likes.Find(x => x.PostId == new ObjectId(postId) && x.UserId == currUserId).Count() == 0)
            {
                _uow.Likes.Add(currLike);

                var likeId = _uow.Likes.Find(x => x.PostId == currLike.PostId && x.UserId == currLike.UserId).FirstOrDefault().Id;

                var currPost = _uow.Posts.Find(x => x.Id == new ObjectId(postId)).FirstOrDefault();
                if (currPost.Likes == null)
                {
                    currPost.Likes = new List<ObjectId>();
                }

                currPost.Likes.Add(likeId);
                _uow.Posts.Edit(currPost);


                var currUser = _uow.Users.GetUser(currUserId);
                if (currUser.Likes == null)
                {
                    currUser.Likes = new List<ObjectId>();
                }

                currUser.Likes.Add(likeId);
                _uow.Users.UpdateUser(currUser, currUser.Id);


                return Ok();
            }
            else
            {
                return Conflict();
            }


        }


        [HttpDelete]
        [Route("dislike/{postId}")]
        public ActionResult Dislike(string postId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currLike = _uow.Likes.Find(x => x.PostId == new ObjectId(postId) && x.UserId == currUserId).FirstOrDefault();

            if (currLike != null)
            {

                var likeId = _uow.Likes.Find(x => x.PostId == currLike.PostId && x.UserId == currLike.UserId).FirstOrDefault().Id;
                _uow.Likes.Delete(currLike);

                var currPost = _uow.Posts.Find(x => x.Id == new ObjectId(postId)).FirstOrDefault();
                currPost.Likes.Remove(likeId);
                _uow.Posts.Edit(currPost);


                var currUser = _uow.Users.GetUser(currUserId);
                currUser.Likes.Remove(likeId);
                _uow.Users.UpdateUser(currUser, currUser.Id);

                return Ok();
            }
            else
            {
                return Conflict();
            }


        }


    }
}