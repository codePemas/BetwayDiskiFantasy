namespace BetwayDiskiFantasy.Api.DTOs
{
    public class CreateLeagueDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class JoinLeagueDto
    {
        public int UserId { get; set; }
        public string Code { get; set; } = string.Empty;
    }

    public class LeagueMemberStandingDto
    {
        public int Rank { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public int TotalPoints { get; set; }
    }

    public class LeagueStandingsResponseDto
    {
        public int LeagueId { get; set; }
        public string LeagueName { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public List<LeagueMemberStandingDto> Standings { get; set; } = new();
    }
}