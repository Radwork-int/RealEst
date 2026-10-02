namespace Estate.Providers
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    public class EstateListingsContext : DbContext
    {
        public EstateListingsContext(DbContextOptions<EstateListingsContext> options) : base(options)
        {
        }
    

        public DbSet<Models.EstateListings> EstateListings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.EstateListings>()
                .Property(e => e.Type)
                .HasMaxLength(50)
                .ValueGeneratedNever()
                .HasColumnType("nvarchar(50)");

           
        }
    }
}
