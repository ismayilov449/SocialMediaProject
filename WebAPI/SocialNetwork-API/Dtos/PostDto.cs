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

        public string Username { get; set; }

        public string ImgId { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

        public List<CommentDto> Comments { get; set; }

        public List<LikeDto> Likes { get; set; }

        public int LikeCount { get; set; }

        public int CommentCount { get; set; }

    }

}
