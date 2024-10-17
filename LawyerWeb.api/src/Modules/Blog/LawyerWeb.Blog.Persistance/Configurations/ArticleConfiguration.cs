using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LawyerWeb.Blog.Persistance.Configurations
{
	public class ArticleConfiguration : IEntityTypeConfiguration<Article>
	{
		public void Configure(EntityTypeBuilder<Article> builder)
		{
			builder.ToTable("Article", "LAW_BLOG");
			builder.HasKey(k => k.Guid);
			builder.Property(p => p.Guid).HasColumnName("Guid").HasValueGenerator<EntityGuidGenerator>();
			builder.Property(p => p.Status).HasColumnName("Status");
			builder.Property(p => p.UpdateDatetime).HasColumnName("UpdateDatetime");
			builder.Property(p => p.InsertDatetime).HasColumnName("InsertDatetime");
			builder.Property(p => p.Title).HasColumnName("Title");
			builder.Property(p => p.Content).HasColumnName("Content");
			builder.Property(p => p.WriterName).HasColumnName("WriterName");
			builder.HasOne(a => a.Category).WithMany().HasForeignKey(a => a.CategoryGuid);
		}
	}
}
