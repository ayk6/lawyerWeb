using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;
using LawyerWeb.Blog.Persistance.Context;

namespace LawyerWeb.Blog.Persistance.Repositories
{
	public class ArticleRepository : EfCoreRepository<BlogManagementContext, Article>, IArticleRepository
	{
		public ArticleRepository(BlogManagementContext context) : base(context)
		{
		}
	}
}
