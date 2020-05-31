using Chat.Models;
using System.Collections.Generic;
using System.Linq;

namespace Chat.Repositories
{
    public class UserRepository
    {
        private static List<User> _onlineUsers = new List<User>();

        private static List<User> users = new List<User>()
        {
            new User { Id = 1, Username = "pedro", Password = "teste123" },
            new User { Id = 2, Username = "user1", Password = "teste123" },
            new User { Id = 3, Username = "user2", Password = "teste123" }
        };

        public static User Get(string username, string password)
        {            
            return users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == password).FirstOrDefault();
        }

        public static User GetUserByName(string username)
        {
            return users.Where(x => x.Username.ToLower() == username.ToLower()).FirstOrDefault();
        }

        public static List<User> GetOnlineUsers()
        {
            return _onlineUsers;
        }

        public static void AddOnlineUser(User user)
        {
            _onlineUsers.Add(user);
        }

    }
}
