namespace BetwayDiskiFantasy.Api.Models
{
    public class PlayerPerformance
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }
        public Player Player { get; set; } = null!;

        public int FixtureId { get; set; }
        public Fixture Fixture { get; set; } = null!;

        // Match Stats
        public int MinutesPlayed { get; set; }
        public int GoalsScored { get; set; }
        public int Assists { get; set; }
        public int CleanSheet { get; set; } // 1 if kept clean sheet, 0 if not
        public int GoalsConceded { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
        public int OwnGoals { get; set; }
        public int PenaltySaves { get; set; }
        public int PenaltyMisses { get; set; }
        public int BonusPoints { get; set; } // 1-3 extra points for top performers

        // Calculated Total Points for this match
        public int TotalPoints { get; set; }
    }
}