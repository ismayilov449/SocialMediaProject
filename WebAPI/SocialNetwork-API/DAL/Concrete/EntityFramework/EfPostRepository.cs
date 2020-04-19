using SocialNetwork_API.DAL.Abstract;
using SocialNetwork_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.DAL.Concrete.EntityFramework
{
    public class EfPostRepository : EfGenericRepository<Post>, IPostRepository
    {


        public EfPostRepository(DataContext context)
            : base(context)
        {

        }

        public DataContext DataContext { get { return context as DataContext; } }

    }
}
