using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Like
    {
        public ObjectId Id { get; set; }

        [Required]
        public ObjectId UserId { get; set; }
        public User User { get; set; }
    }
}
