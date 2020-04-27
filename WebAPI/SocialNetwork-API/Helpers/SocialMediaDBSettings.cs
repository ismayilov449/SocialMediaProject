using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialNetwork_API.Helpers
{
    public class SocialMediaDBSettings : ISocialMediaDBSettings
    {
        public string ConnectionString { get; set; }
        public string DBName { get; set; }
    }

    public interface ISocialMediaDBSettings
    {
        string ConnectionString { get; set; }
        string DBName { get; set; }
    }
}
