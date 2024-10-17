using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.PortableExecutable;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.User;
using LawyerWeb.Blog.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace LawyerWeb.Blog.Application.Services
{
	public class UserService : IUserService
	{
		private readonly UserManager<User> _userManager;
		private readonly IMapper _mapper;
		private readonly IConfiguration _config;
		
		private User _user;

		public UserService(UserManager<User> userManager, IMapper mapper, IConfiguration config)
		{
			_userManager = userManager;
			_mapper = mapper;
			_config = config;
		}

		public async Task<IdentityResult> RegisterUser(UserRegisterVm userRegisterVm)
		{
			var user = _mapper.Map<User>(userRegisterVm);
			
			var result = await  _userManager.CreateAsync(user, userRegisterVm.Password);
			if (result.Succeeded)
			{
				await _userManager.AddToRolesAsync(user, userRegisterVm.Roles);
			}
			return result;
		}

		public async Task<bool> ValidateUser(UserLoginVm userLoginVm)
		{
			_user = await _userManager.FindByNameAsync(userLoginVm.UserName);
			var userCheck = (_user != null && await _userManager.CheckPasswordAsync(_user, userLoginVm.Password));
			
			return userCheck;
		}
		public async Task<string> CreateToken()
		{
			var loginData = GetLoginData();
			var claims = await GetClaims();
			var tokenOpions = GenerateTokenOptions(loginData, claims);
			return new JwtSecurityTokenHandler().WriteToken(tokenOpions);
		}

		private SigningCredentials GetLoginData()
		{
			var jwtSettings = _config.GetSection("JwtSettings");
			var key = Encoding.UTF8.GetBytes(jwtSettings["secretKey"]);
			var secret = new SymmetricSecurityKey(key);

			return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
		}
		private async Task<List<Claim>> GetClaims()
		{
			var claims = new List<Claim>()
			{
				new(ClaimTypes.NameIdentifier, _user.Id)
			};
			var roles = await _userManager.GetRolesAsync(_user);
			foreach (var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}
			return claims;
		}
		private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
		{
			var jwtSettings = _config.GetSection("JwtSettings");
			var tokenOptions = new JwtSecurityToken(
					issuer: jwtSettings["validIssuer"],
					audience: jwtSettings["validAudience"],
					claims,
					expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expires"])),
					signingCredentials: signingCredentials);

			return tokenOptions;
		}

		public async Task<UserVm> GetUserDetails(string userId)
		{
			var user = await _userManager.FindByIdAsync(userId);

			if (user == null)
			{
				return null;
			}
			var roles = await _userManager.GetRolesAsync(user);
			var userVm = _mapper.Map<UserVm>(user);
			userVm.Roles = roles?.ToList() ?? new List<string>();

			return userVm;
		}
	}
}
