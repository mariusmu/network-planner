using Microsoft.AspNetCore.Mvc;
using NetworkPlanner.Api.Models;

namespace NetworkPlanner.Api.Controllers;

[Route("api/[controller]")]
public class ConfigController(AuthenticationConfig config) : Controller
{
    private readonly AuthenticationConfig _config = config;

    [HttpGet]
    public AuthenticationApiModel GetConfig()
    {
        return new AuthenticationApiModel()
        {
            Scopes = _config.Scopes,
            Authority = _config.Authority,
            ClientId = _config.Authority
        };
    }
}