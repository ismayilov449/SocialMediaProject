using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Dtos
{
    public class UploadImageDto
    {

        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string PublicId { get; set; }

    }
}
