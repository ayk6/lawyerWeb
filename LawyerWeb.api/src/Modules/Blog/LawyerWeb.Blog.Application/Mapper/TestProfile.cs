using AutoMapper;
using LawyerWeb.Blog.Application.Shared.ViewModels;
using LawyerWeb.Blog.Domain.Entities;

namespace LawyerWeb.Blog.Application.Mapper
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            CreateMap<Test, TestVm>().ReverseMap();
            CreateMap<Test, InsertTestVm>().ReverseMap();
            CreateMap<Test, UpdateTestVm>().ReverseMap();
        }
    }
}
