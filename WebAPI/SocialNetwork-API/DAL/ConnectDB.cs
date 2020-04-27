using MongoDB.Driver;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL
{
    public static class ConnectDB
    {
        private static IMongoClient _client;
        private static IMongoDatabase _database;

        public static IMongoDatabase Connect(ISocialMediaDBSettings settings)
        {
            _client = new MongoClient(settings.ConnectionString);

            _database = _client.GetDatabase(settings.DBName);
            return _database;
        }
    }
}
