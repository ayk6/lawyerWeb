using AutoMapper;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels.Category;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;

namespace LawyerWeb.Blog.Application.Services
{
	public class CategoryService : ICategoryService
	{
		private readonly ICategoryRepository _categoryRepository;
		private readonly IMapper _mapper;

		public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
		{
			_categoryRepository = categoryRepository;
			_mapper = mapper;
		}

		public long DeleteCategoryByGuid(long guid)
		{
			var existedCategory = _categoryRepository.Get(x => x.Guid.Equals(guid));
			_ = existedCategory ?? throw new Exception($"Category guid: {guid} not found");

			_categoryRepository.Delete(existedCategory);
			return guid;
		}

		public CategoryVm GetCategoryByGuid(long guid)
		{
			var existedCategory = _categoryRepository.Get(x => x.Guid.Equals(guid));
			_ = existedCategory ?? throw new Exception($"Category guid: {guid} not found");
			var mappedData = _mapper.Map<CategoryVm>(existedCategory);

			return mappedData;
		}

		public List<CategoryVm> GetCategoryList()
		{
			var existedCategories = _categoryRepository.GetList();
			var mappedData = _mapper.Map<List<CategoryVm>>(existedCategories);

			return mappedData;
		}

		public CategoryVm InsertCategory(InsertCategoryVm insertCategoryVm)
		{
			var mappedData = _mapper.Map<Category>(insertCategoryVm);
			mappedData.Status = true;
			mappedData.UpdateDatetime = DateTime.Now;

			_categoryRepository.Add(mappedData);

			return _mapper.Map<CategoryVm>(mappedData);
		}

		public CategoryVm UpdateCategory(UpdateCategoryVm updateCategoryVm)
		{
			var existedCategory = _categoryRepository.Get(x => x.Guid.Equals(updateCategoryVm.Guid));
			_ = existedCategory ?? throw new Exception($"Category guid: {updateCategoryVm.Guid} not found");

			var mappedData = _mapper.Map(updateCategoryVm, existedCategory);
			mappedData.UpdateDatetime = DateTime.Now;

			_categoryRepository.Update(mappedData);

			return _mapper.Map<CategoryVm>(mappedData);

		}

	}
}
