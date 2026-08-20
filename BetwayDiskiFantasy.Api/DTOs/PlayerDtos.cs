namespace BetwayDiskiFantasy.Api.DTOs
{
    public class PlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string WebName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int TotalPoints { get; set; }
        public string? ImageUrl { get; set; }
    }
}