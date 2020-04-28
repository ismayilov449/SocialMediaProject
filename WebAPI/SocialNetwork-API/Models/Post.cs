using MongoDB.Bson;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    [BsonCollection("Posts")]
    public class Post : IDocument
    {
        public ObjectId Id { get; set; }

        [Required]
        public ObjectId UserId { get; set; }

        public ObjectId ImgId { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }

        public ICollection<ObjectId> Comments { get; set; }

    }
}
