using Estate.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Threading.Tasks; // Add this for Task

namespace Estate.Providers
{
    public class DbInitializer
    {
        public static async Task SeedData(EstateListingsContext context) // Mark as async and return Task
        {
            // Ensure the database is created
            context.Database.Migrate();


            // Check if data already exists to prevent duplicate seeding
            if (context.EstateListings.Any()) return;

            // Define the file path
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "sample_listings.json");

            if (File.Exists(filePath))
            {
                // Read and deserialize JSON
                var json = File.ReadAllText(filePath);
                // var estates = JsonSerializer.Deserialize<List<EstateListings>>(json);
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var dtos = JsonSerializer.Deserialize<List<EstateListingDto>>(json, options);
                if (dtos == null || dtos.Count == 0) return;
                int idForInsert = 0;
                // Map and validate
                var entities = new List<EstateListings>(dtos.Count);
                foreach (var d in dtos)
                {
                    // If JSON id contains non-numeric values (e.g., "A1"), we discard it and let the DB generate the ID.
                    // If you need to preserve numeric IDs, see the alternative below.
                  

                    //if (!string.IsNullOrWhiteSpace(d.Id) && int.TryParse(d.Id, out var parsedId))
                    //{
                    //    // optional: keep parsedId if you intend to use IDENTITY_INSERT later
                    //    // idForInsert = parsedId;
                    //}

                    entities.Add(new EstateListings
                    {
                        //ID = idForInsert, // 0 => let DB generate
                        Type = d.Type ?? string.Empty,
                        Source = d.Source ?? string.Empty,
                        Address = d.Address ?? string.Empty,
                        City = d.City,
                        State = d.State,
                        ZipCode = d.ZipCode,
                        Price = d.Price ?? 0.0,
                        Bedrooms = d.Bedrooms ?? 0,
                        Bathrooms = d.Bathrooms ?? 0f,
                        Squareft = d.Squareft ?? 0,
                        Latitude = d.Latitude ?? 0f,
                        Longitude = d.Longitude ?? 0f,
                        ListedDate = d.ListedDate ?? string.Empty,
                        Status = d.Status ?? "active",
                        Description = d.Description
                    });
                    idForInsert++;
                }

                    if (entities != null)
                    {
                        context.EstateListings.AddRange(entities);                      
                    }

                    await using var transaction = await context.Database.BeginTransactionAsync();
                    try
                    {
                        //await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.EstateListings ON");
                        await context.SaveChangesAsync();
                        //await context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT dbo.Estatelistings OFF");
                        await transaction.CommitAsync();
                    }
                    catch
                    {
                        await transaction.RollbackAsync();
                        throw;
                    }
                }
            }
        }
    
}

// generate migration
// dotnet ef migrations add AddAgentToEstateListings

// apply to database
// dotnet ef database update
