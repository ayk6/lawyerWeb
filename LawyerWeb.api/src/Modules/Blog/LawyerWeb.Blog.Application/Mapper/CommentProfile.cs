using AutoMapper;
using LawyerWeb.Blog.Application.Shared.ViewModels.Comment;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Application.Mapper
{
	public class CommentProfile : Profile
	{
		public CommentProfile()
		{
			CreateMap<Comment, CommentVm>().ReverseMap(); 
			CreateMap<Comment, InsertCommentVm>().ReverseMap();
			CreateMap<Comment, UpdateCommentVm>().ReverseMap();
		}
	}
}
