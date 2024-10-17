using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LawyerWeb.Blog.Api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly ICommentService _commentService;

		public CommentController(ICommentService commentService)
		{
			_commentService = commentService;
		}

		[HttpGet("GetComments")]
		[Authorize(Roles = "Admin")]
		public IActionResult GetComments()
		{
			return Ok(_commentService.GetCommentList());
		}

		[HttpGet("GetCommentByGuid/{guid}")]
		public IActionResult GetCommentByGuid(long guid)
		{
			return Ok(_commentService.GetCommentByGuid(guid));
		}

		[HttpGet("GetCommentByArticleGuid/{guid}")]
		public IActionResult GetCommentsByArticleGuid(long guid)
		{
			return Ok(_commentService.GetCommentsByArticleGuid(guid));
		}

		[HttpPost("InsertComment")]
		public IActionResult InsertComment(InsertCommentVm insertCommentVm)
		{
			try
			{
				var commentVm = _commentService.InsertComment(insertCommentVm);
				return Ok(commentVm);
			}
			catch (InvalidOperationException ex)
			{
				return BadRequest(new { message = ex.Message });
			}
		}

		[HttpPut("UpdateComment")]
		[Authorize(Roles = "Admin")]
		public IActionResult UpdateComment(UpdateCommentVm updateCommentVm)
		{
			return Ok(_commentService.UpdateComment(updateCommentVm));
		}
		[HttpPut("UpdateCommentByUser")]
		public IActionResult UpdateCommentByUser(UpdateCommentVm updateCommentVm)
		{
			return Ok(_commentService.UpdateCommentByUser(updateCommentVm));
		}

		[HttpDelete("DeleteCommentByGuid/{guid}")]
		[Authorize(Roles = "Admin")]
		public IActionResult DeleteCommentByGuid(long guid)
		{
			return Ok(_commentService.DeleteCommentByGuid(guid));
		}
		[HttpDelete("DeleteCommentByUser/{guid}")]
		public IActionResult DeleteCommentByUser(long guid, [FromBody] string userToken)
		{
			return Ok(_commentService.DeleteCommentByUser(guid, userToken));
		}
	}
}
