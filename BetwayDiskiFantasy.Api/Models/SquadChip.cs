namespace BetwayDiskiFantasy.Api.Models
{
    public class SquadChip
    {
        public int SquadChipId { get; set; }
        public int SquadId { get; set; }
        public string ChipType { get; set; } = string.Empty; // KasiFlava, ParkTheTaxi, SowetoDerby
        public bool IsUsed { get; set; } = false;
        public int? UsedInGameweek { get; set; }
    }
}