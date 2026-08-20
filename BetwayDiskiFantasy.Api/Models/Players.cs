using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BetwayDiskiFantasy.Api.Models
{
    public class Player
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string WebName { get; set; } = string.Empty;

        [Required]
        public string Position { get; set; } = string.Empty; // GK, DEF, MID, FWD

        [Required]
        public string TeamName { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public int TotalPoints { get; set; } = 0;

        public bool IsBench { get; set; } = false;

        public string? ImageUrl { get; set; }
    }
}