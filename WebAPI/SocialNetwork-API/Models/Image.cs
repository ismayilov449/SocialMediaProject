using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    public class Image
    {
        public ObjectId Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }

    }
}
