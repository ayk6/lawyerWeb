using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace LawyerWeb.Blog.Persistance.Configurations
{
	internal class CommentConfiguration : IEntityTypeConfiguration<Comment>
	{
		public void Configure(EntityTypeBuilder<Comment> builder)
		{
			builder.ToTable("Comment", "LAW_BLOG");
			builder.HasKey(k => k.Guid);
			builder.Property(p => p.Guid).HasColumnName("Guid").HasValueGenerator<EntityGuidGenerator>();
			builder.Property(p => p.Status).HasColumnName("Status");
			builder.Property(p => p.UpdateDatetime).HasColumnName("UpdateDatetime");
			builder.Property(p => p.UserName).HasColumnName("UserName");
			builder.Property(p => p.UserMail).HasColumnName("UserMail");
			builder.Property(p => p.UserMobileNo).HasColumnName("UserMobileNo");
			builder.Property(p => p.UserToken).HasColumnName("UserToken");
			builder.Property(p => p.CommentText).HasColumnName("Comment");
			builder.HasOne(a => a.Article).WithMany().HasForeignKey(a => a.ArticleGuid);
			builder.HasOne(a => a.ParentComment).WithMany().HasForeignKey(c => c.ParentCommentGuid);
		}
	}
}
