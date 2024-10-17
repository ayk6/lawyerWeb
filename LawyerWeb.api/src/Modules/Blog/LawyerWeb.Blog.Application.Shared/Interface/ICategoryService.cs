using System.Collections.Generic;
using System.Threading.Tasks;
using LawyerWeb.Blog.Application.Shared.ViewModels.Category;

namespace LawyerWeb.Blog.Application.Shared.Interface
{
	public interface ICategoryService
	{
		public List<CategoryVm> GetCategoryList();
		public CategoryVm GetCategoryByGuid(long guid);
		public CategoryVm InsertCategory(InsertCategoryVm insertCategoryVm);
		public long DeleteCategoryByGuid(long guid);
		public CategoryVm UpdateCategory(UpdateCategoryVm updateCategoryVm);
	}
}
