using AutoMapper;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.Article;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;

namespace LawyerWeb.Blog.Application.Services
{
	public class ArticleService : IArticleService
	{
		private readonly IArticleRepository _articleRepository;
		private readonly ICommentRepository _commentRepository;
		private readonly IMapper _mapper;

		public ArticleService(IMapper mapper, IArticleRepository articleRepository, ICommentRepository commentRepository)
		{
			_mapper = mapper;
			_articleRepository = articleRepository;
			_commentRepository = commentRepository;
		}

		public long DeleteArticleByGuid(long guid)
		{
			var existedArticle = _articleRepository.Get(x => x.Guid.Equals(guid));
			_ = existedArticle ?? throw new Exception($"Article guid: {guid} not found");

			var comments = _commentRepository.GetList(c => c.ArticleGuid == guid);

			foreach (var comment in comments)
			{
				_commentRepository.Delete(comment);
			}

			_articleRepository.Delete(existedArticle);
			return guid;
		}

		public List<ArticleVm> GetArticleByCategoryGuid(long guid)
		{

			var articleList = _articleRepository
			.GetList(x => x.CategoryGuid == guid)
			.OrderByDescending(c => c.UpdateDatetime)
			.ToList();

		
			var mappedData = _mapper.Map<List<ArticleVm>>(articleList);

			return mappedData;
		}

		public ArticleVm GetArticleByGuid(long guid)
		{
			var existedArticle = _articleRepository.Get(x => x.Guid.Equals(guid));
			_ = existedArticle ?? throw new Exception($"Article guid: {guid} not found");
			var mappedData = _mapper.Map<ArticleVm>(existedArticle);

			return mappedData;
		}

		public List<ArticleVm> GetArticleList()
		{
			var existedArticles = _articleRepository.GetList()
				.OrderByDescending(a => a.InsertDatetime);
			var mappedData = _mapper.Map<List<ArticleVm>>(existedArticles);

			return mappedData;
		}

		public ArticleVm InsertArticle(InsertArticleVm insertArticleVm)
		{
			var mappedData = _mapper.Map<Article>(insertArticleVm);
			mappedData.Status = true;
			mappedData.InsertDatetime = DateTime.Now;
			mappedData.UpdateDatetime = DateTime.Now;


			_articleRepository.Add(mappedData);

			return _mapper.Map<ArticleVm>(mappedData);
		}

		public ArticleVm UpdateArticle(UpdateArticleVm updateArticleVm)
		{
			var existedCategory = _articleRepository.Get(x => x.Guid.Equals(updateArticleVm.Guid));
			_ = existedCategory ?? throw new Exception($"Article guid: {updateArticleVm.Guid} not found");

			var mappedData = _mapper.Map(updateArticleVm, existedCategory);
			mappedData.UpdateDatetime = DateTime.Now;

			_articleRepository.Update(mappedData);

			return _mapper.Map<ArticleVm>(mappedData);

		}
	}
}
