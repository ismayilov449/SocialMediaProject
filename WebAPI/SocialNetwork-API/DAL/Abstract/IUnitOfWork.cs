using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Abstract
{
    public interface IUnitOfWork : IDisposable
    {
        IPostRepository Posts { get; }
         
        //ICommentRepository Comments { get; }

        //IFriendsRepository Friends { get; }

        //IMessageRepository Messages { get; }


        int SaveChanges();
    }
}
