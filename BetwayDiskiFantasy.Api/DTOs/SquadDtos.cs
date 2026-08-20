namespace BetwayDiskiFantasy.Api.DTOs
{
    public class SquadPlayerDto
    {
        public int PlayerId { get; set; }
        public bool IsStarter { get; set; }
        public bool IsCaptain { get; set; }
        public bool IsViceCaptain { get; set; }
        public int BenchOrder { get; set; }
    }

    public class SaveSquadDto
    {
        public int UserId { get; set; }
        public List<SquadPlayerDto> Players { get; set; } = new();
    }

    public class SquadResponseDto
    {
        public int SquadId { get; set; }
        public int UserId { get; set; }
        public decimal TotalCost { get; set; }
        public decimal RemainingBudget { get; set; }
        public List<SquadPlayerDetailDto> Players { get; set; } = new();
    }

    public class SquadPlayerDetailDto
    {
        public int PlayerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsStarter { get; set; }
        public bool IsCaptain { get; set; }
        public bool IsViceCaptain { get; set; }
        public int BenchOrder { get; set; }
    }
}