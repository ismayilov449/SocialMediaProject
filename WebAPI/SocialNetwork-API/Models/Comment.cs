using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Comment
    {
        public ObjectId Id { get; set; }

        public ObjectId? UserId { get; set; }

        public ObjectId? PostId { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

    }
}
