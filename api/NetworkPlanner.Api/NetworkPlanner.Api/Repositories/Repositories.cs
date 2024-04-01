using Microsoft.EntityFrameworkCore;
using NetworkPlanner.Api.Database;
using NetworkPlanner.Api.Models;
using Environment = NetworkPlanner.Api.Models.Environment;

namespace NetworkPlanner.Api.Repositories;

public interface IEnvironmentRepository : IGenericRepository<Models.Environment>
{
}

public class EnvironmentRepository(NetworkPlannerDbContext context)
    : GenericRepository<Models.Environment>(context), IEnvironmentRepository
{
}

public interface IFirewallRepository : IGenericRepository<Models.FirewallEntry>
{
}

public class FirewallRepository(NetworkPlannerDbContext context)
    : GenericRepository<FirewallEntry>(context), IFirewallRepository
{
    private readonly NetworkPlannerDbContext _context = context;

    public async Task<IEnumerable<FirewallEntry>> GetAll()
    {
        return await _context.Set<FirewallEntry>().Include(p => p.Environment).Include(p => p.Source)
            .Include(p => p.Destination).ToListAsync();
    }
    
    public async Task Add(FirewallEntry entity)
    {
        // _context.Attach(entity.Environment);
        _context.Attach(entity.Destination);
        _context.Attach(entity.Environment);
        
        if (_context.ChangeTracker.Entries<HostnameModel>().All(f => f.Entity.Id != entity.Source.Id))
        {
            context.Attach(entity.Source);
        } 
        _context.Set<FirewallEntry>().Add(entity);
        await _context.SaveChangesAsync();
    }
}

public interface IHostnameRepository : IGenericRepository<HostnameModel>
{
}

public class HostnameRepository(NetworkPlannerDbContext context)
    : GenericRepository<Models.HostnameModel>(context), IHostnameRepository
{
    private readonly NetworkPlannerDbContext _context = context;

    public async Task Add(HostnameModel entity)
    {
        if (entity.Environment.Any())
        {
            _context.AttachRange(entity.Environment);
        }

        _context.Set<HostnameModel>().Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<HostnameModel>> GetAll()
    {
        return await _context.Set<HostnameModel>().Include(p => p.Environment).ToListAsync();
    }
}