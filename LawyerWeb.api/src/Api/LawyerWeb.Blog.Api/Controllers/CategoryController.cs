using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels;
using LawyerWeb.Blog.Application.Shared.ViewModels.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerWeb.Blog.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryService _categoryService;

		public CategoryController(ICategoryService categoryService)
		{
			_categoryService = categoryService;
		}
		[HttpGet("GetCategory")]
		public IActionResult GetCategories()
		{
			return Ok(_categoryService.GetCategoryList());
		}


		[HttpGet("GetCategoryByGuid/{guid}")]
		public IActionResult GetCategoryByGuid(long guid)
		{
			return Ok(_categoryService.GetCategoryByGuid(guid));
		}

		[HttpPost("InsertCategory")]
		[Authorize(Roles = "Admin")]
		public IActionResult InsertCategory(InsertCategoryVm insertCategoryVm)
		{
			return Ok(_categoryService.InsertCategory(insertCategoryVm));
		}

		[HttpPut("UpdateCategory")]
		[Authorize(Roles = "Admin")]
		public IActionResult UpdateCategory(UpdateCategoryVm updateCategoryVm)
		{
			return Ok(_categoryService.UpdateCategory(updateCategoryVm));
		}

		[HttpDelete("DeleteCategoryByGuid/{guid}")]
		[Authorize(Roles = "Admin")]
		public IActionResult DeleteCategoryByGuid(long guid)
		{
			return Ok(_categoryService.DeleteCategoryByGuid(guid));
		}

	}
}
