namespace NetworkPlanner.Api.Models;

public class AuthenticationConfig
{
    public string Authority { get; set; }
    public string ClientSecret { get; set; }
    public string ClientId { get; set; }
    public IList<string> Scopes { get; set; }
}