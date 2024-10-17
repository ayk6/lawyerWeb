using Microsoft.Extensions.DependencyInjection;

namespace LawyerWeb.Blog.Domain
{
    public static class BlogDomainModule
    {
        public static IServiceCollection AddBlogDomainModule(this IServiceCollection services)
        {
            return services;
        }
    }
}
