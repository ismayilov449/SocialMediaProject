using MongoDB.Bson;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{

    [BsonCollection("Likes")]
    public class Like : IDocument
    {
        public ObjectId Id { get; set; }

        public ObjectId UserId { get; set; }
        public ObjectId PostId { get; set; }
    }
}
