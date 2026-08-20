namespace BetwayDiskiFantasy.Api.Models
{
    public class Gameweek
    {
        public int Id { get; set; }
        public int Number { get; set; } // GW1, GW2, etc.
        public string Name { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public bool IsFinished { get; set; } = false;

        // Navigation Properties
        public ICollection<Fixture> Fixtures { get; set; } = new List<Fixture>();
    }
}