using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using LawyerWeb.Blog.Application.Shared.ViewModels;
using LawyerWeb.Blog.Application.Shared.ViewModels.Category;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Application.Mapper
{
	public class CategoryProfile: Profile
	{
		public CategoryProfile() {
			CreateMap<Category, CategoryVm>().ReverseMap();
			CreateMap<Category, InsertCategoryVm>().ReverseMap();
			CreateMap<Category, UpdateCategoryVm>().ReverseMap();
		}
	}
}
