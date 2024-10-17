using LawyerWeb.Blog.Api.Extensions;
using LawyerWeb.Blog.Application;
using LawyerWeb.Blog.Domain;
using LawyerWeb.Blog.Domain.Entities;
using LawyerWeb.Blog.Infrastructure;
using LawyerWeb.Blog.Persistance;
using LawyerWeb.Blog.Persistance.Context;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddBlogApplicationModule();
builder.Services.AddBlogDomainModule();
builder.Services.AddBlogPersistenceModule(builder.Configuration);
builder.Services.AddBlogInfrastructureModule();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureCors();

builder.Services.ConfigureIdentity();
builder.Services.ConfigureJWT(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
