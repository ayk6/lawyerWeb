using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LawyerWeb.Blog.Application.Shared.ViewModels.Comment
{
	public class CommentVm
	{
		public long Guid { get; set; }
		public DateTime UpdateDatetime { get; set; }
		public string UserName { get; set; }
		public string? UserToken { get; set; }
		public string? CommentText { get; set; }
		public long ArticleGuid { get; set; }
		public string? UserMobileNo { get; set; }
		public List<CommentVm>? ReplyCommentVmList { get; set; }
	}
}
