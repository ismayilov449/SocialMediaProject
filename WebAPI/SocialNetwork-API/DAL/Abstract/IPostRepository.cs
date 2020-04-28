using MongoDB.Bson;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Abstract
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        List<Post> GetPostsByUserId(ObjectId objectId);


    }
}
