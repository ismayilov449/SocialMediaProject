using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Dtos
{
    public class PostDetailsDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public Image UserImgUrl { get; set; }

        public Image ImgUrl { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
