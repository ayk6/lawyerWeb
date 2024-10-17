using AutoMapper;
using LawyerWeb.Blog.Application.Shared.ViewModels.Article;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Application.Mapper
{
	public class ArticleProfile: Profile
	{
		public ArticleProfile()
		{
			CreateMap<Article, ArticleVm>().ReverseMap();
			CreateMap<Article, InsertArticleVm>().ReverseMap();
			CreateMap<Article, UpdateArticleVm>().ReverseMap();
		}
	}
}
