using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Abstract
{
    public interface IUnitOfWork
    {
        IPostRepository Posts { get; }

        IAuthRepository Users { get; }

        ICommentRepository Comments { get; }

        ILikeRepository Likes { get; }

        //IFriendsRepository Friends { get; }

        //IMessageRepository Messages { get; }

    }
}
