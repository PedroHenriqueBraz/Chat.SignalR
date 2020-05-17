using Chat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Repositories
{
    public class UserRepository
    {
        public static User Get(string username, string password)
        {
            var users = new List<User>();
            users.Add(new User { Id = 1, Username = "pedro", Password = "teste123" });
            users.Add(new User { Id = 2, Username = "user1", Password = "teste123" });
            users.Add(new User { Id = 3, Username = "user2", Password = "teste123" });
            return users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == password).FirstOrDefault();
        }
    }
}
