using LawyerWeb.Blog.Application.Services;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.Article;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LawyerWeb.Blog.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ArticleController : ControllerBase
	{
		private readonly IArticleService _articleService;

		public ArticleController(IArticleService articleService)
		{
			_articleService = articleService;
		}

		[HttpGet("GetArticles")]
		public IActionResult GetArticlees()
		{
			return Ok(_articleService.GetArticleList());
		}


		[HttpGet("GetArticleByGuid/{guid}")]
		public IActionResult GetArticleByGuid(long guid)
		{
			return Ok(_articleService.GetArticleByGuid(guid));
		}
		[HttpGet("GetArticleByCategoryGuid/{guid}")]
		public IActionResult GetArticleByCategoryGuid(long guid)
		{
			return Ok(_articleService.GetArticleByCategoryGuid(guid));
		}


		[HttpPost("InsertArticle")]
		[Authorize(Roles = "Admin")]
		public IActionResult InsertArticle(InsertArticleVm insertArticleVm)
		{
			return Ok(_articleService.InsertArticle(insertArticleVm));
		}

		[HttpPut("UpdateArticle")]
		[Authorize(Roles = "Admin")]
		public IActionResult UpdateArticle(UpdateArticleVm updateArticleVm)
		{
			return Ok(_articleService.UpdateArticle(updateArticleVm));
		}

		[HttpDelete("DeleteArticleByGuid/{guid}")]
		[Authorize(Roles = "Admin")]
		public IActionResult DeleteArticleByGuid(long guid)
		{
			return Ok(_articleService.DeleteArticleByGuid(guid));
		}
	}
}
