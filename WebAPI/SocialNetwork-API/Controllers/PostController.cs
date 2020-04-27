using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Models;

namespace SocialNetwork_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private IUnitOfWork _uow;
        private IConfiguration _configuration;

        public PostController(IUnitOfWork uow, IConfiguration configuration)
        {
            _uow = uow;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getall")]
        public ActionResult GetAll()
        {
            var posts = _uow.Posts.GetAll();


            // var postsToReturn = _mapper.Map<IEnumerable<PostDto>>(posts);

            return Ok(posts);
        }

        [HttpPost]
        [Route("sharepost")]
        public ActionResult SharePost([FromBody]Post post)
        {

            //var currUploadImageDto = CloudinaryMethods.UploadImageToCloudinary(uploadImageDto);

            //if (currUploadImageDto.File.Length > 0)
            //{
            //    post.Photo = new Image();
            //    post.Photo.PublicId = currUploadImageDto.PublicId;
            //    post.Photo.Url = currUploadImageDto.Url;
            //}
             

            post.UserId = _uow.Users.GetUserId(User.Identity.Name);
            post.SharedTime = DateTime.UtcNow;
            _uow.Posts.Add(post);

            return Ok(post);
        }

        [HttpGet]
        [Route("detail/{id}")]
        public ActionResult GetPostById(ObjectId id)
        {
            var post = _uow.Posts.Find(x => x.Id == id).FirstOrDefault();


            return Ok(post);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult> GetPost(int id)
        //{
        //    var post = await context.Posts.FirstOrDefaultAsync(i => i.Id == id);
        //    return Ok(post);
        //}

    }
}