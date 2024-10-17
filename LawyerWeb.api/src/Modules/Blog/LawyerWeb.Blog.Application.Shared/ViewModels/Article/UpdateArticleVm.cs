using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LawyerWeb.Blog.Application.Shared.ViewModels.Article
{
	public class UpdateArticleVm
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public string? WriterName { get; set; }
		public string? Title { get; set; }
		public string? Content { get; set; }
		public long CategoryGuid { get; set; }
	}
}
