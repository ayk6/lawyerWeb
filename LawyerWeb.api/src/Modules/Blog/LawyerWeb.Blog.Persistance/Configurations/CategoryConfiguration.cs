

using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LawyerWeb.Blog.Persistance.Configurations
{
	public class CategoryConfiguration: IEntityTypeConfiguration<Category>
	{
		public void Configure(EntityTypeBuilder<Category> builder)
		{
			builder.ToTable("Category", "LAW_BLOG");
			builder.HasKey(k => k.Guid);
			builder.Property(p => p.Guid).HasColumnName("Guid").HasValueGenerator<EntityGuidGenerator>();
			builder.Property(p => p.Name).HasColumnName("Name");
			builder.Property(p => p.Status).HasColumnName("Status");
			builder.Property(p => p.UpdateDatetime).HasColumnName("UpdateDatetime");
			builder.Property(p => p.Description).HasColumnName("Description");
		}
	}
}
