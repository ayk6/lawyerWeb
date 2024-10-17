using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LawyerWeb.Blog.Application.Shared.ViewModels.Article;
using LawyerWeb.Blog.Application.Shared.ViewModels.User;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Application.Mapper
{
	public class UserProfile : Profile
	{
		public UserProfile() {
			CreateMap<User, UserRegisterVm>().ReverseMap();
			CreateMap<User, UserVm>().ReverseMap();
		}
	}
}
