using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace NetworkPlanner.Api.Models;

public class HostnameModel : BaseModel
{
    public string Name { get; set; }
    public string Hostname { get; set; }
    public string IpAddress { get; set; }
    public List<Environment>? Environment { get; set; }
    public JsonDocument Groups { get; set; }
    public string Description { get; set; }
    
}