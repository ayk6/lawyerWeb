using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Domain.Repositories
{
	public interface ICategoryRepository : IEfCoreRepository<Category>
	{
	}
}
