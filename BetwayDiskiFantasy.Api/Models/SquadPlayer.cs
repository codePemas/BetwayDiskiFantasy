namespace BetwayDiskiFantasy.Api.Models
{
    public class SquadPlayer
    {
        public int UserSquadId { get; set; }
        public UserSquad UserSquad { get; set; } = null!;

        public int PlayerId { get; set; }
        public Player Player { get; set; } = null!;

        // Meta properties for gameweek management
        public bool IsStarter { get; set; } = true;
        public bool IsCaptain { get; set; } = false;
        public bool IsViceCaptain { get; set; } = false;
        
        // Bench position (1, 2, 3, 4) if IsStarter is false
        public int BenchOrder { get; set; } = 0; 
    }
}