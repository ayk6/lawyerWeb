using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;
using LawyerWeb.Blog.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace LawyerWeb.Blog.Persistance.Repositories
{
	internal class CommentRepository : EfCoreRepository<BlogManagementContext, Comment>, ICommentRepository
	{
		public CommentRepository(BlogManagementContext context) : base(context)
		{
		}

		public bool ExistsCommentByUserMobileNoAndArticleGuid(string userMobileNo, long articleGuid)
		{
			return Context.Comments.Any(c => c.UserMobileNo == userMobileNo && c.ArticleGuid == articleGuid);
		}
	}
}
