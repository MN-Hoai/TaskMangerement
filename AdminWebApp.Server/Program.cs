using AdminWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình DI connection string cho DBContext
var connection = "Data Source=.;Initial Catalog=TaskManagement;TrustServerCertificate=True;Persist Security Info=True;User ID=sa;Password=123456";
builder.Services.AddDbContext<DBContext>(option => option.UseSqlServer(connection));// Cấu hình JSON
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference(options =>
    {
        options.WithTitle("SERVER API");
        options.WithSidebar(true);
        options.WithTheme(ScalarTheme.Default);
        options.DarkMode = false;
        options.ForceThemeMode = ThemeMode.Light;
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
