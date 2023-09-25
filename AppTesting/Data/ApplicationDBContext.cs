using AppTesting.Models;
using Microsoft.EntityFrameworkCore;

namespace AppTesting.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        { }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // กำหนดให้รหัสผู้ใช้มีค่าเป็น GUID
            modelBuilder.Entity<Users>()
                .Property(u => u.Id)
                .HasDefaultValueSql("NEWID()");
        }
    }
}
