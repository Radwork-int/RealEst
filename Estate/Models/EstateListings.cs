using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Estate.Models
{
    public enum ListingStatus
    {
        active,
        pending,
        sold
    }
    public class EstateListings
    {
        private ListingStatus _status;
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int ID { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("source")]
        public string Source { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
        [JsonProperty("city")]
        public string? City  { get; set; }
        [JsonProperty("state")]
        public string? State { get; set; }
        [JsonProperty("zip")]
        public string? ZipCode { get; set; }
        [JsonProperty("price")]
        public double Price { get; set; }
        [JsonProperty("bedrooms")]
        public int Bedrooms { get; set; }
        [JsonProperty("bathrooms")]
        public float Bathrooms { get; set; }
        [JsonProperty("sqft")]
        public int Squareft { get; set; }
        [JsonProperty("latitude")]
        public float Latitude { get; set; }
        [JsonProperty("longitude")]
        public float Longitude { get; set; }
        [JsonProperty("listedDate")]
        public string ListedDate { get; set; }
        [JsonProperty("status")]
        public string Status { 
            get { return _status.ToString(); }
            set
            {
                if (Enum.TryParse(value, true, out ListingStatus status))
                {
                    _status = status;
                }
                else
                {
                   
                    _status = ListingStatus.active; // Default to active if parsing fails
                }
            }
        }
        [JsonProperty("description")]
        public string? Description { get; set; }
    }
}
