using LawyerWeb.Blog.Persistance.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using LawyerWeb.Blog.Domain.Repositories;
using LawyerWeb.Blog.Persistance.Repositories;
using LawyerWeb.Blog.Domain.Entities;
using Microsoft.AspNetCore.Identity;


namespace LawyerWeb.Blog.Persistance
{
    public static class BlogPersistenceModule
    {
        public static IServiceCollection AddBlogPersistenceModule(this IServiceCollection services,
                                                                IConfiguration configuration)
        {
            services.AddDbContext<BlogManagementContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("LawyerWebDbConnection")));

			

			services.AddScoped<ITestRepository, TestRepository>();
			services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IArticleRepository, ArticleRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();


			return services;
        }
	}
}
