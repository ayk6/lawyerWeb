using LawyerWeb.Blog.Application.Shared.ViewModels;

namespace LawyerWeb.Blog.Application.Shared.Interface
{
    public interface ITestService
    {
        public List<TestVm> GetTestList();
        public List<TestVm> GetTestList2();
        public TestVm GetTestByGuid(long guid);
        public TestVm InsertTest(InsertTestVm insertTestVm);
        public TestVm UpdateTest(UpdateTestVm updateTestVm);
        public long DeleteTestByGuid(long guid);
    }
}
