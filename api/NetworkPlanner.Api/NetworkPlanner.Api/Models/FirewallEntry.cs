using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace NetworkPlanner.Api.Models;

public class FirewallEntry : BaseModel
{
    public HostnameModel Source { get; set; }
    public HostnameModel Destination { get; set; }
    
    public JsonDocument DestinationPorts { get; set; }
    public string Description { get; set; }
    public Environment Environment { get; set; }
    
}