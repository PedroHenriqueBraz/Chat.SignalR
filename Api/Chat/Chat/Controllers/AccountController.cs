using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Chat.Models;
using Chat.Repositories;
using Chat.Services;

namespace Chat.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        
        [HttpPost("login")]
        public async Task<ActionResult<dynamic>> Login([FromBody]Credential model)
        {
            var user = UserRepository.Get(model.Username, model.Password);

            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateToken(user);

            user.Password = "";

            return new
            {
                user = user,
                token = token
            };
        }

        [HttpGet]
        [Route("authenticated")]
        //[Authorize]
        public string Authenticated() => String.Format("Autenticado - {0}", User.Identity.Name);
    }
}