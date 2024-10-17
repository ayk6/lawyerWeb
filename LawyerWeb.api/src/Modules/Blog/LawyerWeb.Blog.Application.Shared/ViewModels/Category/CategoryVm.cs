namespace LawyerWeb.Blog.Application.Shared.ViewModels.Category
{
	public class CategoryVm
	{
		public long Guid { get; set; }
		public bool Status { get; set; }
		public string? Name { get; set; }
		public DateTime UpadateDateTime { get; set; }
		public string? Description { get; set; }
	}
}