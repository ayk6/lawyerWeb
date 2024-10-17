using System.ComponentModel.DataAnnotations;

namespace LawyerWeb.Blog.Application.Shared.ViewModels.User
{
	public record UserLoginVm
	{
		[Required(ErrorMessage ="Username required")]
		public string? UserName { get; init;}

		[Required(ErrorMessage = "Password required")]
		public string? Password { get; init;}
	}
}
