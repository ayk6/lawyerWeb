namespace LawyerWeb.Blog.Domain.Entities
{
	public class Category
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public DateTime UpdateDatetime { get; set; }
		public string? Name { get; set; }
		public string? Description { get; set; }

	}
}
