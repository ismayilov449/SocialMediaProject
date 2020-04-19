using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        public Image Photo { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

        public ICollection<Comment> Comments { get; set; }

    }
}
