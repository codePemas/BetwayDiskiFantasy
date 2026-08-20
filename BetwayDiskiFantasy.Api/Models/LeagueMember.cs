namespace BetwayDiskiFantasy.Api.Models
{
    public class LeagueMember
    {
        public int LeagueId { get; set; }
        public League League { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}