using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Dtos;
using SocialNetwork_API.Helpers;
using SocialNetwork_API.Models;

namespace SocialNetwork_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private IUnitOfWork _uow;
        private IConfiguration _configuration;
        private IMapper _mapper;

        public PostController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getall")]
        public ActionResult GetAll()
        {

            var posts = _uow.Posts.GetAll();
            posts = posts.OrderByDescending(x => x.SharedTime);
            var postsToReturn = _mapper.Map<IEnumerable<PostDto>>(posts);

            return Ok(postsToReturn);
        }

        [HttpGet]
        [Route("getuserposts")]
        public ActionResult GetUserPosts()
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);

            var currUserPosts = _uow.Posts.Find(x => x.UserId == currUserId);
            var postsToReturn = _mapper.Map<IEnumerable<PostDto>>(currUserPosts);

            return Ok(postsToReturn);
        }

        [HttpPost]
        [Route("sharepost")]
        public ActionResult SharePost([FromBody]Post post)
        {

            
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);

            var currUser = _uow.Users.GetUser(currUserId);

            post.Username = currUser.Username;
            post.UserId = currUserId;
            post.SharedTime = DateTime.UtcNow;
            _uow.Posts.Add(post);



            currUser.Posts = _uow.Posts.GetPostsByUserId(currUserId).Select(x => x.Id).ToList();
            _uow.Users.UpdateUser(currUser, currUserId);

            var postToReturn = _mapper.Map<PostDto>(post);

            return Ok(postToReturn);
        }

        [HttpPost]
        [Route("editpost")]
        public ActionResult EditPost([FromBody]PostDto post)
        {

            var currPost = _uow.Posts.Get(new ObjectId(post.Id));
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);

            if (post.UserId == currUserId.ToString())
            {

                currPost.ImgId = new ObjectId(post.ImgId);
                currPost.SharedTime = post.SharedTime;
                currPost.Text = post.Text;
                currPost.Comments = post.Comments;

                _uow.Posts.Edit(currPost);
            }
            else
            {
                return Unauthorized();
            }

            return Ok(currPost);
        }

        [HttpDelete]
        [Route("removepost/{id}")]
        public ActionResult RemovePost(string id)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);

            var currPost = _uow.Posts.Get(new ObjectId(id));

            if (currPost.UserId == currUserId)
            {

                _uow.Posts.Delete(currPost);
                var currUser = _uow.Users.GetUser(currUserId);
                currUser.Posts = _uow.Posts.GetPostsByUserId(currUserId).Select(x => x.Id).ToList();
                _uow.Users.UpdateUser(currUser, currUserId);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpGet]
        [Route("detail/{id}")]
        public ActionResult GetPostById(string id)
        {
            var post = _uow.Posts.Find(x => x.Id == new ObjectId(id)).FirstOrDefault();



            var postToReturn = new PostDetailsDto();
            postToReturn.Id = post.Id.ToString();
            postToReturn.Text = post.Text;
            postToReturn.Comments = _uow.Comments.GetAll().Where(x => x.PostId == post.Id).ToList();
            postToReturn.Likes = _uow.Likes.GetAll().Where(x => x.PostId == post.Id).ToList();
            postToReturn.Username = User.Identity.Name;

            return Ok(postToReturn);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult> GetPost(int id)
        //{
        //    var post = await context.Posts.FirstOrDefaultAsync(i => i.Id == id);
        //    return Ok(post);
        //}

    }
}