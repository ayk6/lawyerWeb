namespace LawyerWeb.Blog.Domain.Entities
{
	public class Article
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public DateTime? InsertDatetime { get; set; }
		public DateTime? UpdateDatetime { get; set; }
		public string? WriterName { get; set; }
		public string? Title { get; set; }
		public string? Content { get; set; }
		public long CategoryGuid { get; set; }
		public Category? Category { get; set; }
	}


}
