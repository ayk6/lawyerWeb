namespace LawyerWeb.Blog.Application.Shared.ViewModels.Article
{
	public class ArticleVm
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public DateTime InsertDateTime { get; set; }
		public DateTime UpdateDatetime { get; set; }
		public string? WriterName { get; set; }
		public string? Title { get; set; }
		public string? Content { get; set; }
		public long CategoryGuid { get; set; }
	}
}
