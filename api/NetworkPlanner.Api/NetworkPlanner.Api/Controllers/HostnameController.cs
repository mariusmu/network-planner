using Microsoft.AspNetCore.Mvc;
using NetworkPlanner.Api.Models;
using NetworkPlanner.Api.Repositories;

namespace NetworkPlanner.Api.Controllers;

[Route("api/Hostname")]
public class HostnameModelController(IHostnameRepository repository) : Controller
{
    [HttpGet()]
    public async Task<List<HostnameModel>> GetAll()
    {
        var found = await repository.GetAll();
        var HostnameModels = found as HostnameModel[] ?? found.ToArray();
        return !HostnameModels.Any() ? [] : HostnameModels.ToList();
    }

    [HttpPost]
    public async Task Add([FromBody] HostnameModel HostnameModel)
    {
        await repository.Add(HostnameModel);
    }
    
    [HttpDelete("{id}")]
    public async Task Remove(string id)
    {
        await repository.Delete(id);
    }
}