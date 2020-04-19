using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Dtos
{
    public class RetrieveImageDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
    }
}
