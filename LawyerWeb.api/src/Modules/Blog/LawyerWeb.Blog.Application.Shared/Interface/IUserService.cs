using LawyerWeb.Blog.Application.Shared.ViewModels.User;
using Microsoft.AspNetCore.Identity;


namespace LawyerWeb.Blog.Application.Shared.Interface
{
	public interface IUserService
	{
		Task<IdentityResult> RegisterUser(UserRegisterVm userRegisterVm);
		Task<bool> ValidateUser(UserLoginVm userLoginVm);
		Task<UserVm> GetUserDetails(string userId);
		Task<string> CreateToken();
	}
}
