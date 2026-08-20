namespace BetwayDiskiFantasy.Api.DTOs
{
    public class PlayerScoreDetailDto
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public int RawPoints { get; set; }
        public int FinalPoints { get; set; }
        public bool IsCaptain { get; set; }
        public bool IsViceCaptain { get; set; }
        public bool IsStarter { get; set; }
        public bool WasSubbedIn { get; set; }
        public bool WasSubbedOut { get; set; }
        public int MinutesPlayed { get; set; }
    }

    public class UserGameweekScoreResponseDto
    {
        public int UserId { get; set; }
        public string TeamName { get; set; } = string.Empty;
        public int GameweekId { get; set; }
        public int TotalPoints { get; set; }
        public List<PlayerScoreDetailDto> StartingLineup { get; set; } = new();
        public List<PlayerScoreDetailDto> Bench { get; set; } = new();
    }
}