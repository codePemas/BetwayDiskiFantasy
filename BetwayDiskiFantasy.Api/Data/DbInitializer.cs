using BetwayDiskiFantasy.Api.Models;

namespace BetwayDiskiFantasy.Api.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Wipe existing database and tables entirely
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var players = new List<Player>
            {
                // --- 11 PITCH STARTERS ---
                new Player { Name = "Ronwen Williams", WebName = "Williams", Position = "GK", TeamName = "Mamelodi Sundowns", Price = 6.0m, TotalPoints = 38, IsBench = false },
                new Player { Name = "Given Msimango", WebName = "Msimango", Position = "DEF", TeamName = "Kaizer Chiefs", Price = 5.0m, TotalPoints = 22, IsBench = false },
                new Player { Name = "Fawaaz Basadien", WebName = "Basadien", Position = "DEF", TeamName = "Stellenbosch FC", Price = 5.5m, TotalPoints = 34, IsBench = false },
                new Player { Name = "Innocent Maela", WebName = "Maela", Position = "DEF", TeamName = "Orlando Pirates", Price = 4.5m, TotalPoints = 18, IsBench = false },
                new Player { Name = "Thapelo Morena", WebName = "Morena", Position = "DEF", TeamName = "Mamelodi Sundowns", Price = 5.0m, TotalPoints = 26, IsBench = false },
                new Player { Name = "Patrick Maswanganyi", WebName = "Maswanganyi", Position = "MID", TeamName = "Orlando Pirates", Price = 8.0m, TotalPoints = 45, IsBench = false },
                new Player { Name = "Relebohile Mofokeng", WebName = "Mofokeng", Position = "MID", TeamName = "Orlando Pirates", Price = 7.5m, TotalPoints = 42, IsBench = false },
                new Player { Name = "Gaston Sirino", WebName = "Sirino", Position = "MID", TeamName = "Kaizer Chiefs", Price = 7.0m, TotalPoints = 31, IsBench = false },
                new Player { Name = "Themba Zwane", WebName = "Zwane", Position = "MID", TeamName = "Mamelodi Sundowns", Price = 8.5m, TotalPoints = 39, IsBench = false },
                new Player { Name = "Lucas Ribeiro", WebName = "Ribeiro", Position = "FWD", TeamName = "Mamelodi Sundowns", Price = 9.0m, TotalPoints = 48, IsBench = false },
                new Player { Name = "Zakhele Lepasa", WebName = "Lepasa", Position = "FWD", TeamName = "Orlando Pirates", Price = 7.0m, TotalPoints = 29, IsBench = false },

                // --- 4 BENCH SUBSTITUTES ---
                new Player { Name = "Sipho Chaine", WebName = "Chaine", Position = "GK", TeamName = "Orlando Pirates", Price = 4.5m, TotalPoints = 15, IsBench = true },
                new Player { Name = "Tapelo Xoki", WebName = "Xoki", Position = "DEF", TeamName = "Orlando Pirates", Price = 5.0m, TotalPoints = 20, IsBench = true },
                new Player { Name = "Bathusi Aubaas", WebName = "Aubaas", Position = "MID", TeamName = "Mamelodi Sundowns", Price = 5.0m, TotalPoints = 14, IsBench = true },
                new Player { Name = "Tshegofatso Mabasa", WebName = "Mabasa", Position = "FWD", TeamName = "Orlando Pirates", Price = 8.0m, TotalPoints = 40, IsBench = true },
            };

            context.Players.AddRange(players);
            context.SaveChanges();
        }
    }
}