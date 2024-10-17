using LawyerWeb.Blog.Application.Shared.ViewModels.Article;

namespace LawyerWeb.Blog.Application.Shared.Interface
{
	public interface IArticleService
	{
		public List<ArticleVm> GetArticleList();
		public ArticleVm GetArticleByGuid(long guid);
		public List<ArticleVm> GetArticleByCategoryGuid(long guid);

		public ArticleVm InsertArticle(InsertArticleVm insertArticleVm);
		public long DeleteArticleByGuid(long guid);
		public ArticleVm UpdateArticle(UpdateArticleVm updateArticleVm);
	}
}
