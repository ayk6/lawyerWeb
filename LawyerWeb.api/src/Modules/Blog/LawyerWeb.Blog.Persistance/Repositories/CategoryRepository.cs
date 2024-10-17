using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;
using LawyerWeb.Blog.Persistance.Context;

namespace LawyerWeb.Blog.Persistance.Repositories
{
	internal class CategoryRepository : EfCoreRepository<BlogManagementContext, Category>, ICategoryRepository
	{
		public CategoryRepository(BlogManagementContext context) : base(context)
		{
		}
	}
}
