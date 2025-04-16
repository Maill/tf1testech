
using Application.Services;
using Domain.Interfaces;
using Infrastrcture.Repository;

namespace tf1testech.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddSingleton<ILeavePeriodRepository, LeavePeriodRepository>();
            builder.Services.AddSingleton<ILeavePeriodService, LeavePeriodService>();

            builder.Services.AddCors(x =>
            {
                x.AddDefaultPolicy(y => y.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            });
            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
