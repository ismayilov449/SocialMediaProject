using MongoDB.Bson;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Request : IDocument
    {
        public ObjectId Id { get; set; }
        public ObjectId UserId { get; set; }
        public string Status { get; set; }
    }
}
