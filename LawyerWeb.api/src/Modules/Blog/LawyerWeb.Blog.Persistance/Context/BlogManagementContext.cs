using LawyerWeb.Blog.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LawyerWeb.Blog.Persistance.Context
{
    public class BlogManagementContext : IdentityDbContext<User>
    {
        public  BlogManagementContext(DbContextOptions<BlogManagementContext> options) : base(options)
        {
        }

        public virtual DbSet<Test> Tests { get; set; }
		public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}
