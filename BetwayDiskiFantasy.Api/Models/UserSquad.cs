namespace BetwayDiskiFantasy.Api.Models
{
    public class UserSquad
    {
        public int Id { get; set; }
        
        // Foreign Key to User
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation collection linking to the 15 selected players
        public ICollection<SquadPlayer> SquadPlayers { get; set; } = new List<SquadPlayer>();
    }
}