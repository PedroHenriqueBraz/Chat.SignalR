using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

using System.Security.Claims;
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
            // Recupera o usuário
            var user = UserRepository.Get(model.Username, model.Password);

            // Verifica se o usuário existe
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            // Gera o Token
            var token = TokenService.GenerateToken(user);

            // Oculta a senha
            user.Password = "";

            // Retorna os dados
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