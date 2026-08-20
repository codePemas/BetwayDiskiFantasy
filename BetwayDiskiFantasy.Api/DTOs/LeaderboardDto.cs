namespace BetwayDiskiFantasy.Api.DTOs
{
    public class LeaderboardEntryDto
    {
        public int Rank { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public int TotalPoints { get; set; }
        public int LatestGameweekPoints { get; set; }
    }

    public class LeaderboardResponseDto
    {
        public int TotalManagers { get; set; }
        public int CompletedGameweeks { get; set; }
        public List<LeaderboardEntryDto> Standings { get; set; } = new();
    }
}