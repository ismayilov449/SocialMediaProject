using MongoDB.Bson;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Models
{
    [BsonCollection("Users")]
    public class User : IDocument
    {
        public ObjectId Id { get; set; }
        public string Username { get; set; }
        public ObjectId ImgId { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public ICollection<ObjectId> Posts { get; set; }
        public ICollection<ObjectId> Likes { get; set; }

        //    public ICollection<User> Friends { get; set; }
    }
}

