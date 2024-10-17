using LawyerWeb.Blog.Application.Mapper;
using LawyerWeb.Blog.Application.Services;
using LawyerWeb.Blog.Application.Shared.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace LawyerWeb.Blog.Application
{
    public static class BlogApplicationModule
    {
        public static IServiceCollection AddBlogApplicationModule(this IServiceCollection services)
        {
            services.AddScoped<ITestService, TestService>();
			services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IArticleService, ArticleService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IUserService, UserService>();

			services.AddAutoMapper(typeof(TestProfile));
			services.AddAutoMapper(typeof(CategoryProfile));
			services.AddAutoMapper(typeof(ArticleProfile));
            services.AddAutoMapper(typeof(CommentProfile));
			services.AddAutoMapper(typeof(UserProfile));

			return services;
        }
    }
}
