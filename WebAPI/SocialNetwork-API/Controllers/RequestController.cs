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
using SocialNetwork_API.Models;

namespace SocialNetwork_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private IUnitOfWork _uow;
        private IConfiguration _configuration;
        private IMapper _mapper;

        public RequestController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _uow = uow;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);
            return Ok(currUser.Requests.ToList());
        }

        [HttpPost]
        [Route("sendRequest/{userId}")]
        public IActionResult SendRequest(string userId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);
            currUser.Requests.Add(new Request() { UserId = new ObjectId(userId), Status = "Waiting" });
            _uow.Users.UpdateUser(currUser, currUserId);


            return Ok();
        }

        [HttpDelete]
        [Route("cancelRequest/{userId}")]
        public IActionResult CancelRequest(string userId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);

            var requests = currUser.Requests.ToList();

            if (requests.FindAll(x => x.Status == "Waiting" && x.UserId == new ObjectId(userId)).Any())
            {
                var currRequest = requests.Find(x => x.Status == "Waiting" && x.UserId == new ObjectId(userId));
                currUser.Requests.Remove(currRequest);
            }
            _uow.Users.UpdateUser(currUser, currUserId);

            return Ok();
        }

        [HttpDelete]
        [Route("removeFriend/{userId}")]
        public IActionResult RemoveFriend(string userId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);

            currUser.Requests.Remove(currUser.Requests.ToList().Find(x => x.Status == "Accepted" && x.UserId == new ObjectId(userId)));
            _uow.Users.UpdateUser(currUser, currUserId);

            return Ok();
        }

        [HttpPost]
        [Route("acceptRequest/{userId}")]
        public IActionResult AcceptRequest(string userId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);

            if (currUser.Requests.ToList().Find(x => x.UserId == new ObjectId(userId)).Status == "Waiting")
            {
                currUser.Requests.ToList().Find(x => x.UserId == new ObjectId(userId)).Status = "Accepted";
            }


            _uow.Users.UpdateUser(currUser, currUserId);

            return Ok();
        }

        [HttpDelete]
        [Route("rejectRequest/{userId}")]
        public IActionResult RejectRequest(string userId)
        {
            var currUserId = new ObjectId(User.Claims.ToList().FirstOrDefault(i => i.Type == "UserId").Value);
            var currUser = _uow.Users.GetUser(currUserId);

            currUser.Requests.Remove(currUser.Requests.ToList().Find(x => x.Status == "Waiting" && x.UserId == new ObjectId(userId)));
            _uow.Users.UpdateUser(currUser, currUserId);

            return Ok();
        }


    }
}