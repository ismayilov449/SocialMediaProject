using SocialNetwork_API.DAL.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.EntityFramework
{
    public class EfUnitOfWork : IUnitOfWork
    {

        private readonly DataContext context;

        public EfUnitOfWork(DataContext _context)
        {
            context = _context ?? throw new ArgumentNullException("DbContext can not be null");
        }


        private IPostRepository _posts;

        //private ICommentRepository _comments;

        //private IFriendsRepository _friends;

        //private IMessageRepository _messages;




        public IPostRepository Posts
        {
            get
            {
                return _posts ?? (_posts = new EfPostRepository(context));
            }
        }

        //public ICommentRepository Comments
        //{
        //    get
        //    {
        //        return _comments ?? (_comments = new EfCommentRepository(context));
        //    }
        //}

        //public IFriendsRepository Friends
        //{
        //    get
        //    {
        //        return _friends ?? (_friends = new EfFriendsRepository(context));
        //    }
        //}

        //public IMessageRepository Messages
        //{
        //    get
        //    {
        //        return _messages ?? (_messages = new EfMessageRepository(context));
        //    }
        //}


        public int SaveChanges()
        {
            try
            {
                return context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }

        }

        public void Dispose()
        {
            context.Dispose();

        }
    }
}
