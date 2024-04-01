using Microsoft.AspNetCore.Mvc;
using NetworkPlanner.Api.Database;
using NetworkPlanner.Api.Models;
using NetworkPlanner.Api.Repositories;
using Environment = NetworkPlanner.Api.Models.Environment;

namespace NetworkPlanner.Api.Controllers;

[Route("api/FirewallEntry")]
public class FirewallController(IFirewallRepository firewallRepository) : Controller
{
    private readonly IFirewallRepository _firewallRepository = firewallRepository;

    [HttpGet()]
    public async Task<List<FirewallEntry>> GetAll()
    {
        var found = await _firewallRepository.GetAll();
        var HostnameModels = found as FirewallEntry[] ?? found.ToArray();
        return !HostnameModels.Any() ? [] : HostnameModels.ToList();
    }

    [HttpPost]
    public async Task Add([FromBody] FirewallEntry firewallEntry)
    {
        firewallEntry.Source.Environment = new List<Environment>();
        firewallEntry.Destination.Environment = new List<Environment>();
        await firewallRepository.Add(firewallEntry);
    }
    
    [HttpDelete("{id}")]
    public async Task Remove(string id)
     {
        await firewallRepository.Delete(id);
    }
}