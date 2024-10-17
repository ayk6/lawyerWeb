using System;
using System.Web.Http;
using AutoMapper;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.Comment;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;

namespace LawyerWeb.Blog.Application.Services
{
	public class CommentService : ICommentService
	{
		private readonly ICommentRepository _commentRepository;
		private readonly IMapper _mapper;

		public CommentService(ICommentRepository commentRepository, IMapper mapper)
		{
			_commentRepository = commentRepository;
			_mapper = mapper;
		}

		public long DeleteCommentByGuid(long guid)
		{
			var existedComment = _commentRepository.Get(x => x.Guid.Equals(guid));
			_ = existedComment ?? throw new Exception($"Comment guid: {guid} not found");

			_commentRepository.Delete(existedComment);
			return guid;
		}
		public long DeleteCommentByUser( long guid, string userToken)
		{
			var existedComment = _commentRepository.Get(x => x.Guid.Equals(guid));
			_ = existedComment ?? throw new Exception($"Comment guid: {guid} not found");

			if (existedComment.UserToken != userToken) throw new Exception($"unauthorized request");

			_commentRepository.Delete(existedComment);
			return guid;
		}

		public List<CommentVm> GetCommentsByArticleGuid(long guid)
		{
			var commentList = _commentRepository
			.GetList(x => x.ArticleGuid == guid && x.ParentCommentGuid == null)
			.OrderByDescending(c => c.UpdateDatetime)
			.ToList();

			var commentVmList = commentList.Select(c =>
			{
				var commentVm = _mapper.Map<CommentVm>(c);
				commentVm.ReplyCommentVmList = GetReplies(c.Guid);
				return commentVm;
			}).ToList();

			return commentVmList;
		}

		public CommentVm GetCommentByGuid(long guid)
		{
			var existedComment = _commentRepository.Get(x => x.Guid.Equals(guid));
			_ = existedComment ?? throw new Exception($"Comment guid: {guid} not found");
			var replyComments = _commentRepository.GetList()
				.Where(c => c.ParentCommentGuid == guid)
				.OrderBy(c => c.UpdateDatetime).ToList();
			var mappedData = _mapper.Map<CommentVm>(existedComment);
			mappedData.ReplyCommentVmList = _mapper.Map<List<CommentVm>>(replyComments);

			return mappedData;
		}

		public List<CommentVm> GetCommentList()
		{
			var commentList = _commentRepository
			.GetList(x => x.ParentCommentGuid == null)
			.OrderByDescending(c => c.UpdateDatetime)
			.ToList();

			var commentVmList = commentList.Select(c =>
			{
				var commentVm = _mapper.Map<CommentVm>(c);
				commentVm.ReplyCommentVmList = GetReplies(c.Guid);
				return commentVm;
			}).ToList();

			return commentVmList;
		}

		public CommentVm InsertComment(InsertCommentVm insertCommentVm)
		{
			if (_commentRepository.ExistsCommentByUserMobileNoAndArticleGuid(insertCommentVm.UserMobileNo, insertCommentVm.ArticleGuid))
			{
				throw new InvalidOperationException("Bir telefon numarasıyla aynı makaleye birden fazla yorum yapılamaz.");
			}
			var mappedData = _mapper.Map<Comment>(insertCommentVm);
			mappedData.Status = true;
			mappedData.UpdateDatetime = DateTime.Now;
			mappedData.UserToken = Guid.NewGuid().ToString();
			_commentRepository.Add(mappedData);

			return _mapper.Map<CommentVm>(mappedData);
		}

		public CommentVm UpdateComment(UpdateCommentVm updateCommentVm)
		{
			var existedComment = _commentRepository.Get(x => x.Guid.Equals(updateCommentVm.Guid));
			_ = existedComment ?? throw new Exception($"Comment guid: {updateCommentVm.Guid} not found");

			var mappedData = _mapper.Map(updateCommentVm, existedComment);
			mappedData.UpdateDatetime= DateTime.Now;

			_commentRepository.Update(mappedData);

			return _mapper.Map<CommentVm>(mappedData);
		}

		public CommentVm UpdateCommentByUser(UpdateCommentVm updateCommentVm)
		{
			var existedComment = _commentRepository.Get(x => x.Guid.Equals(updateCommentVm.Guid));
			_ = existedComment ?? throw new Exception($"Comment guid: {updateCommentVm.Guid} not found");

			if (existedComment.UserToken != updateCommentVm.UserToken) throw new Exception($"unauthorized request");

			var mappedData = _mapper.Map(updateCommentVm, existedComment);
			mappedData.UpdateDatetime = DateTime.Now;

			_commentRepository.Add(mappedData);

			return _mapper.Map<CommentVm>(mappedData);
		}

		private List<CommentVm> GetReplies(long parentCommentGuid)
		{
			var replyList = _commentRepository
				.GetList(x => x.ParentCommentGuid == parentCommentGuid)
				.ToList();

			var replyVmList = replyList.Select(c =>
			{
				var replyVm = _mapper.Map<CommentVm>(c);
				replyVm.ReplyCommentVmList = GetReplies(c.Guid);
				return replyVm;
			}).ToList();

			return replyVmList;
		}
	}

}
