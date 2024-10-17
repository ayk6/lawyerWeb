using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;
using LawyerWeb.Blog.Persistance.Context;

namespace LawyerWeb.Blog.Persistance.Repositories
{
    public class TestRepository : EfCoreRepository<BlogManagementContext, Test>, ITestRepository
    {
        public TestRepository(BlogManagementContext context) : base(context)
        {
        }

        public List<Test> GetList2()
        {
            return Context.Tests.AsQueryable().ToList();
        }
    }
}
