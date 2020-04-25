using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialNetwork_API.DAL;
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
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PostController(DataContext context, IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        [Route("getposts")]
        public ActionResult GetPosts()
        {
            var posts = _context.Posts.Include(p => p.Comments).Include(u => u.User).Include(p => p.Photo).ToList();


            var postsToReturn = _mapper.Map<IEnumerable<PostDto>>(posts);

            return Ok(postsToReturn);
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
            _uow.Posts.Add(post);
            _uow.SaveChanges();

            return Ok(post);
        }

        [HttpGet]
        [Route("detail/{id}")]
        public ActionResult GetPostById(int id)
        {
            var post = _context.Posts.Include(c => c.Comments).ThenInclude(c => c.User).Include(u => u.User).Include(p => p.Photo).FirstOrDefault(i => i.Id == id);

            var postToReturn = _mapper.Map<PostDetailsDto>(post);

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