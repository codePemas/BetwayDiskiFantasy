namespace BetwayDiskiFantasy.Api.DTOs
{
    public class FixtureDto
    {
        public int Id { get; set; }
        public string HomeTeam { get; set; } = string.Empty;
        public string AwayTeam { get; set; } = string.Empty;
        public DateTime KickOffTime { get; set; }
        public int Gameweek { get; set; }
        public int? HomeScore { get; set; }
        public int? AwayScore { get; set; }
        public bool IsFinished { get; set; }
    }
}