using Microsoft.EntityFrameworkCore;
using NetworkPlanner.Api.Database;
using NetworkPlanner.Api.Models;
using NetworkPlanner.Api.Repositories;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("NetworkPlannerConnection");
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString).EnableDynamicJson().Build();
    
builder.Services.AddDbContext<NetworkPlannerDbContext>(d => d.UseNpgsql(dataSourceBuilder));
builder.Services.AddSingleton(
    builder.Configuration.GetSection(nameof(AuthenticationConfig)).Get<AuthenticationConfig>());
builder.Services.AddScoped<IFirewallRepository, FirewallRepository>();
builder.Services.AddScoped<IEnvironmentRepository, EnvironmentRepository>();
builder.Services.AddScoped<IHostnameRepository, HostnameRepository>();
builder.Services.AddControllers();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(p => p.WithOrigins("http://localhost:1234").AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();
app.MapControllers();
app.Run();