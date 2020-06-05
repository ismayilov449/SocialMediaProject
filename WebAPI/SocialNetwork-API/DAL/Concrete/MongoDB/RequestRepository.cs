using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Helpers;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.MongoDB
{
    //public class RequestRepository : GenericRepository<Request>, IRequestRepository
    //{
    //    private readonly IMongoCollection<Request> _requests;

    //    public RequestRepository(ISocialMediaDBSettings settings) : base(settings)
    //    {
    //        var db = ConnectDB.Connect(settings);
    //        _requests = db.GetCollection<Request>("Requests");
    //    }

       
    //}
}
