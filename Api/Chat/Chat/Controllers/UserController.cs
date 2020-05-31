using Chat.Models;
using Chat.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Chat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("users")]
        //[Authorize]
        public List<User> GetOnlineUsers()
        {
            return UserRepository.GetOnlineUsers();
        }
    }
}
