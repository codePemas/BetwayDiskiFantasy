namespace BetwayDiskiFantasy.Api.Models;

public class Team
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortCode { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }

    // Navigation property for relationships
    public ICollection<Player> Players { get; set; } = new List<Player>();
}