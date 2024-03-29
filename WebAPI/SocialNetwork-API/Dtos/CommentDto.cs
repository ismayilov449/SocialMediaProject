﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Dtos
{
    public class CommentDto
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string PostId { get; set; }

        public string Username { get; set; }

        public string Text { get; set; }

        public DateTime SharedTime { get; set; }
    }
}
