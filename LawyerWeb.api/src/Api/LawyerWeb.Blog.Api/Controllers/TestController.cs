using LawyerWeb.Blog.Application.Shared.Interface;
using LawyerWeb.Blog.Application.Shared.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace LawyerWeb.Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpGet("GetTest")]
        public IActionResult GetTest()
        {
            return Ok(_testService.GetTestList());
        }

        [HttpGet("GetTest2")]
        public IActionResult GetTest2()
        {
            return Ok(_testService.GetTestList2());
        }

        [HttpGet("GetTestByGuid/{guid}")]
        public IActionResult GetTestByGuid(long guid)
        {
            return Ok(_testService.GetTestByGuid(guid));
        }

        [HttpPost("InsertTest")]
        public IActionResult InsertTest(InsertTestVm insertTestVm)
        {
            return Ok(_testService.InsertTest(insertTestVm));
        }

        [HttpPut("UpdateTest")]
        public IActionResult UpdateTest(UpdateTestVm updateTestVm)
        {
            return Ok(_testService.UpdateTest(updateTestVm));
        }

        [HttpDelete("DeleteTestByGuid/{guid}")]
        public IActionResult DeleteTestByGuid(long guid)
        {
            return Ok(_testService.DeleteTestByGuid(guid));
        }
    }
}
