using Microsoft.EntityFrameworkCore;

namespace NetworkPlanner.Api.Database;

public class NetworkPlannerDbContext : DbContext
{
    public NetworkPlannerDbContext()
    {
        
    }
    public NetworkPlannerDbContext(DbContextOptions<NetworkPlannerDbContext> options)
        : base(options)
    {
        
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Models.Environment>(e =>
        {
            e.ToTable("Environment");
            e.Property(p => p.Id);
            e.Property(p => p.Description);
            e.Property(p => p.Name);
        });

        modelBuilder.Entity<Models.HostnameModel>(e =>
        {
            e.ToTable("Hostname");
            e.Property(p => p.Hostname);
            e.Property(p => p.Id);
            e.Property(p => p.Description);
            e.HasMany(p => p.Environment).WithMany();
            e.Property(p => p.IpAddress);
            e.Property(p => p.Groups);
        });

        modelBuilder.Entity<Models.FirewallEntry>(e =>
        {
            e.ToTable("FirewallEntry");
            e.Property(p => p.Id);
            e.Property(p => p.Description);
            e.Property(p => p.DestinationPorts);
            e.HasOne(p => p.Destination).WithMany().HasForeignKey(e => e.Id);
            e.HasOne(p => p.Source).WithMany().HasForeignKey(e => e.Id);
        });
    }
}