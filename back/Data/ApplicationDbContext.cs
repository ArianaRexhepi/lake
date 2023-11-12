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

        public DbSet<Lake> Lakes { get; set; }

    }
}
