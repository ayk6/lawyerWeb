using AutoMapper;
using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Domain.Repositories;

namespace LawyerWeb.Blog.Application.Services
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;
        private readonly IMapper _mapper;

        public TestService(ITestRepository testRepository, IMapper mapper)
        {
            _testRepository = testRepository;
            _mapper = mapper;
        }

        public long DeleteTestByGuid(long guid)
        {
            var testEntity = _testRepository.Get(x => x.Guid.Equals(guid));
            _ = testEntity ?? throw new Exception($"Guid: {guid} not found");

            _testRepository.Delete(testEntity);

            return guid;
        }

        public TestVm GetTestByGuid(long guid)
        {
            var testEntity = _testRepository.Get(x => x.Guid.Equals(guid));
            var mappedData = _mapper.Map<TestVm>(testEntity);

            return mappedData;
        }

        public List<TestVm> GetTestList()
        {
            var testEntities = _testRepository.GetList();
            var mappedData = _mapper.Map<List<TestVm>>(testEntities);

            return mappedData;
        }

        public List<TestVm> GetTestList2()
        {
            var testEntities = _testRepository.GetList2();
            var mappedData = _mapper.Map<List<TestVm>>(testEntities);

            return mappedData;
        }

        public TestVm InsertTest(InsertTestVm insertTestVm)
        {
            var mappedData = _mapper.Map<Test>(insertTestVm);
            mappedData.Status = true;
            mappedData.UpdateDatetime = DateTime.Now;

            _testRepository.Add(mappedData);

            return _mapper.Map<TestVm>(mappedData);
        }

        public TestVm UpdateTest(UpdateTestVm updateTestVm)
        {
            var testEntity = _testRepository.Get(x => x.Guid.Equals(updateTestVm.Guid));
            _ = testEntity ?? throw new Exception($"Guid: {updateTestVm.Guid} not found");

            var mappedData = _mapper.Map(updateTestVm, testEntity);
            mappedData.UpdateDatetime = DateTime.Now;

            _testRepository.Update(mappedData);

            return _mapper.Map<TestVm>(mappedData);

        }
    }
}
