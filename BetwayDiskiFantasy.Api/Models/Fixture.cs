namespace BetwayDiskiFantasy.Api.Models
{
    public class Fixture
    {
        public int Id { get; set; }

        public int GameweekId { get; set; }
        public Gameweek Gameweek { get; set; } = null!;

        public int HomeTeamId { get; set; }
        public Team HomeTeam { get; set; } = null!;

        public int AwayTeamId { get; set; }
        public Team AwayTeam { get; set; } = null!;

        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }
        public DateTime MatchDate { get; set; }
        public bool IsCompleted { get; set; } = false;

        public ICollection<PlayerPerformance> Performances { get; set; } = new List<PlayerPerformance>();
    }
}