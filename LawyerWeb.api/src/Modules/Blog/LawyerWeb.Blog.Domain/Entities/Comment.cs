using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LawyerWeb.Blog.Domain.Entities
{
	public class Comment
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public DateTime UpdateDatetime { get; set; }
		public string UserName { get; set; }
		public string? UserMail { get; set; }
		public string? UserToken { get; set; }
		public string? UserMobileNo { get; set; }
		public string? CommentText { get; set; }
		public Article Article { get; set; }
		public long ArticleGuid { get; set; }
		public Comment? ParentComment { get; set; }
		public long? ParentCommentGuid { get; set; }
	}
}
