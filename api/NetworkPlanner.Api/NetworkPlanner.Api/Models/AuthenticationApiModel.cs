namespace NetworkPlanner.Api.Models;

public class AuthenticationApiModel
{
    public string Authority { get; set; }
    public string ClientId { get; set; }
    public IList<string> Scopes { get; set; }
}