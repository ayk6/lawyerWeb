using Microsoft.Extensions.DependencyInjection;

namespace LawyerWeb.Blog.Infrastructure
{
    public static class BlogInfrastructureModule
    {
        public static IServiceCollection AddBlogInfrastructureModule(this IServiceCollection services)
        {
            return services;
        }
    }
}
