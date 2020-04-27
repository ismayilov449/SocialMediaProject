using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.MongoDB
{
    public class GenericRepository<TDocument> : IGenericRepository<TDocument> where TDocument : IDocument
    {
        private readonly IMongoCollection<TDocument> _collection;

        public GenericRepository(ISocialMediaDBSettings settings)
        {
            var db = ConnectDB.Connect(settings);

            _collection = db.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
        }

        private protected string GetCollectionName(Type documentType)
        {
            return documentType.Name + "s";
        }

        public IQueryable<TDocument> GetAll()
        {
            return _collection.Find(obj => true).ToList().AsQueryable();
        }
        public TDocument Get(ObjectId id)
        {
            //var objectId = new ObjectId(id);
            return _collection.Find<TDocument>(obj => obj.Id == id).FirstOrDefault();
        }

        public void Add(TDocument obj)
        {
            _collection.InsertOne(obj);

        }
        public virtual void AddMany(IEnumerable<TDocument> documents)
        {

            _collection.InsertMany(documents);
        }

        public void Edit(ObjectId id, TDocument objIn)
        {
            //var objectId = new ObjectId(id);
            _collection.ReplaceOne(obj => obj.Id == id, objIn);
        }

        public void Delete(TDocument objIn) =>
            _collection.DeleteOne(obj => obj.Id == objIn.Id);

        public void Delete(ObjectId id)
        {
            // var objectId = new ObjectId(id);
            _collection.DeleteOne(obj => obj.Id == id);
        }



        public IQueryable<TDocument> Find(Expression<Func<TDocument, bool>> predicate)
        {
            return _collection.Find(predicate).ToList().AsQueryable();
        }

        public void Edit(TDocument document)
        {
            var filter = Builders<TDocument>.Filter.Eq(doc => doc.Id, document.Id);
            _collection.FindOneAndReplace(filter, document);
        }
    }
}
