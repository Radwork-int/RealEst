using System.Text.Json.Serialization;

namespace Estate.Models
    {
        public sealed class EstateListingDto
        {
            [JsonPropertyName("id")]
            public int Id { get; set; }

            [JsonPropertyName("type")]
            public string? Type { get; set; }

            [JsonPropertyName("source")]
            public string? Source { get; set; }

            [JsonPropertyName("address")]
            public string? Address { get; set; }

            [JsonPropertyName("city")]
            public string? City { get; set; }

            [JsonPropertyName("state")]
            public string? State { get; set; }

            [JsonPropertyName("zip")]
            public string? ZipCode { get; set; }

            [JsonPropertyName("price")]
            public double? Price { get; set; }

            [JsonPropertyName("bedrooms")]
            public int? Bedrooms { get; set; }

            [JsonPropertyName("bathrooms")]
            public float? Bathrooms { get; set; }

            [JsonPropertyName("sqft")]
            public int? Squareft { get; set; }

            [JsonPropertyName("latitude")]
            public float? Latitude { get; set; }

            [JsonPropertyName("longitude")]
            public float? Longitude { get; set; }

            [JsonPropertyName("listedDate")]
            public string? ListedDate { get; set; }

            [JsonPropertyName("status")]
            public string? Status { get; set; }

            [JsonPropertyName("description")]
            public string? Description { get; set; }
        }
    
}

