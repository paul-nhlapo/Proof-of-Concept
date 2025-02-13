using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserViewModel model)
        {
            var existingUser = await _userManager.FindByEmailAsync(model.emailaddress);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            var newUser = new AppUser
            {
                Email = model.emailaddress,
                UserName = model.emailaddress
            };

            var result = await _userManager.CreateAsync(newUser, model.password);
            if (result.Succeeded)
            {
                return Ok("User created successfully");
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.emailaddress);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.password))
            {
                var token = await GenerateJWTToken(user);
                return Ok(new { token });
            }
            return BadRequest("Invalid login attempt");
        }

        private async Task<string> GenerateJWTToken(AppUser user)
        {
            var role = await _userManager.GetRolesAsync(user);
            IdentityOptions _identityOptions = new IdentityOptions();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

            if (role.Any())
            {
                claims.Add(new Claim(_identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Tokens:Issuer"],
                audience: _configuration["Tokens:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
