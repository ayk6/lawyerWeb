using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LawyerWeb.Blog.Application.Shared.ViewModels.User
{
	public class UserVm
	{
		public string? Id { get; set; }
		public string? UserName { get; set; }
		public string? Email { get; set; }
		public List<string>? Roles { get; set; }
	}
}
