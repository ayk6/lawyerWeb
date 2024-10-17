using System.Security.Claims;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerWeb.Blog.Api.Controllers
{
	[Route("api/auth")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;
		public UserController(IUserService userService)
		{
			_userService = userService;
		}

		[HttpPost]
		public async Task<IActionResult> RegisterUser(UserRegisterVm userRegisterVm)
		{
			var result = await _userService.RegisterUser(userRegisterVm);
			if (!result.Succeeded) {
				foreach (var error in result.Errors)
				{
					ModelState.TryAddModelError(error.Code, error.Description);
				}
				return BadRequest(ModelState);
			}
			
			return Ok("User Created");
		}

		[HttpPost("login")]
		public async Task<IActionResult> ValidateUser(UserLoginVm userLoginVm)
		{
			if (!await _userService.ValidateUser(userLoginVm)) {
				return Unauthorized();
			}
			return Ok(new
			{
				Token = _userService.CreateToken()
			});
		}

		[HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetUserDetails()
        {
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var userDetails = await _userService.GetUserDetails(userId);
            if (userDetails == null)
            {
                return NotFound("User not found");
            }

            return Ok(userDetails);
        }
	}
}
