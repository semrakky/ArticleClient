using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArticleClient.Models
{
    public class usersession
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Gender { get; set; }

        public string Passwd { get; set; }
        public String RoleName { get; set; }
        public String RoleDescription { get; set; }
    }
}