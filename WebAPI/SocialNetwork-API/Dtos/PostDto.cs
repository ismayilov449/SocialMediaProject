using MongoDB.Bson;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Dtos
{
    public class PostDto
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string ImgId { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

        public ICollection<ObjectId> Comments { get; set; }

        public int Likes { get; set; }
    }
}
