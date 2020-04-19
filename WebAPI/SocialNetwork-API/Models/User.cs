using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string ImgUrl { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<Post> Posts { get; set; }
        public ICollection<Like> Likes { get; set; }

        //    public ICollection<User> Friends { get; set; }
    }
}

