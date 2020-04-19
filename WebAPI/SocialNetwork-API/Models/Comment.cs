using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public User User { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

    }
}
