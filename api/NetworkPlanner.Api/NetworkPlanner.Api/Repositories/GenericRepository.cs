using Microsoft.EntityFrameworkCore;
using NetworkPlanner.Api.Database;
using NetworkPlanner.Api.Models;

namespace NetworkPlanner.Api.Repositories;

public interface IGenericRepository<T>
{
    Task<IEnumerable<T>> GetAll();
    Task Add(T entity);
    Task Delete(string id);
}

public class GenericRepository<T>(NetworkPlannerDbContext context) : IGenericRepository<T>
    where T : BaseModel
{
    public async Task<IEnumerable<T>> GetAll()
    {
        return await context.Set<T>().ToListAsync();
    }

    public async Task Add(T entity)
    {
        await context.Set<T>().AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task Delete(string id)
    {
        var set = context.Set<T>();
        var found = await set.SingleOrDefaultAsync(i => i.Id == id);
        if (found != null)
        {
            set.Remove(found);
        }

        await context.SaveChangesAsync();
    }
}