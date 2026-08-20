namespace BetwayDiskiFantasy.Api.DTOs
{
    public class CreateGameweekDto
    {
        public int Number { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
    }

    public class CreateFixtureDto
    {
        public int GameweekId { get; set; }
        public int HomeTeamId { get; set; }
        public int AwayTeamId { get; set; }
        public DateTime MatchDate { get; set; }
    }

    public class RecordPlayerPerformanceDto
    {
        public int PlayerId { get; set; }
        public int MinutesPlayed { get; set; }
        public int GoalsScored { get; set; }
        public int Assists { get; set; }
        public bool KeptCleanSheet { get; set; }
        public int GoalsConceded { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
        public int OwnGoals { get; set; }
        public int PenaltySaves { get; set; }
        public int PenaltyMisses { get; set; }
        public int BonusPoints { get; set; }
    }

    public class CompleteFixtureResultDto
    {
        public int FixtureId { get; set; }
        public int HomeScore { get; set; }
        public int AwayScore { get; set; }
        public List<RecordPlayerPerformanceDto> Performances { get; set; } = new();
    }
}