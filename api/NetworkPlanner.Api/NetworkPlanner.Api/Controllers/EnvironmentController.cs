using Microsoft.AspNetCore.Mvc;
using NetworkPlanner.Api.Repositories;
using Environment = NetworkPlanner.Api.Models.Environment;

namespace NetworkPlanner.Api.Controllers;

[Route("api/environment")]
public class EnvironmentController(IEnvironmentRepository repository) : Controller
{
    [HttpGet()]
    public async Task<List<Environment>> GetAll()
    {
        var found = await repository.GetAll();
        var environments = found as Environment[] ?? found.ToArray();
        return !environments.Any() ? [] : environments.ToList();
    }

    [HttpPost]
    public async Task Add([FromBody] Environment environment)
    {
        await repository.Add(environment);
    }
    
    [HttpDelete("{id}")]
    public async Task Remove(string id)
    {
        await repository.Delete(id);
    }
}