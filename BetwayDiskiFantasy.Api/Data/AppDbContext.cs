using BetwayDiskiFantasy.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BetwayDiskiFantasy.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Team> Teams { get; set; } = null!;
        public DbSet<Player> Players { get; set; } = null!;
        public DbSet<UserSquad> UserSquads { get; set; } = null!;
        public DbSet<SquadPlayer> SquadPlayers { get; set; } = null!;
        public DbSet<Gameweek> Gameweeks { get; set; } = null!;
        public DbSet<Fixture> Fixtures { get; set; } = null!;
        public DbSet<PlayerPerformance> PlayerPerformances { get; set; } = null!;
        public DbSet<League> Leagues { get; set; } = null!;
        public DbSet<LeagueMember> LeagueMembers { get; set; } = null!;

        public DbSet<SquadChip> SquadChips { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite Key for SquadPlayer
            modelBuilder.Entity<SquadPlayer>()
                .HasKey(sp => new { sp.UserSquadId, sp.PlayerId });

            // Composite Key for LeagueMember
            modelBuilder.Entity<LeagueMember>()
                .HasKey(lm => new { lm.LeagueId, lm.UserId });
        }
    }
}