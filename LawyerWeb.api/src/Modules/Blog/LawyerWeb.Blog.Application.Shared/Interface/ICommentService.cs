using LawyerWeb.Blog.Application.Shared.ViewModels.Comment;

namespace LawyerWeb.Blog.Application.Shared.Interface
{
	public interface ICommentService
	{
		public List<CommentVm> GetCommentList();
		public CommentVm GetCommentByGuid(long guid);
		public List<CommentVm> GetCommentsByArticleGuid(long guid);
		public CommentVm InsertComment(InsertCommentVm insertCommentVm);
		public long DeleteCommentByGuid(long guid);
		public long DeleteCommentByUser(long guid, string userToken);
		public CommentVm UpdateComment(UpdateCommentVm updateCommentVm);
		public CommentVm UpdateCommentByUser(UpdateCommentVm updateCommentVm);
	}
}
