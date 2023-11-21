using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using back.Models;

namespace back.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<LakeSighting>()
                .HasOne(a => a.User)
                .WithMany(b => b.LakeSightings)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<LakeSighting>()
                .HasOne(a => a.Lake)
                .WithMany(b => b.LakeSightings)
                .HasForeignKey(f => f.LakeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
        public DbSet<Lake> Lakes { get; set; }
        public DbSet<LakeSighting> LakeSightings { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

    }
}
