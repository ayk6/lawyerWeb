using Core.Data.EFCore.Repository;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Domain.Repositories
{
	public interface ICommentRepository: IEfCoreRepository<Comment>
	{
		bool ExistsCommentByUserMobileNoAndArticleGuid(string userMobileNo, long articleGuid);
	}
}
