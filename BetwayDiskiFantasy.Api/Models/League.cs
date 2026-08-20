using System.ComponentModel.DataAnnotations;

namespace BetwayDiskiFantasy.Api.Models
{
    public class League
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(10)]
        public string Code { get; set; } = string.Empty;

        public int AdminUserId { get; set; }
        public User AdminUser { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property for members
        public ICollection<LeagueMember> Members { get; set; } = new List<LeagueMember>();
    }
}