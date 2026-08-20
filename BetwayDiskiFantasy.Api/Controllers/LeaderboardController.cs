using BetwayDiskiFantasy.Api.Data;
using BetwayDiskiFantasy.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaderboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaderboardController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves global standings ranked by total points across all completed gameweeks.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<LeaderboardResponseDto>> GetGlobalLeaderboard()
        {
            // 1. Fetch completed gameweek IDs
            var completedGameweekIds = await _context.Gameweeks
                .Where(g => g.IsFinished)
                .Select(g => g.Id)
                .ToListAsync();

            var latestGameweek = await _context.Gameweeks
                .OrderByDescending(g => g.Number)
                .FirstOrDefaultAsync();

            // 2. Query UserSquads directly with User and SquadPlayers included
            var squads = await _context.UserSquads
                .Include(s => s.User)
                .Include(s => s.SquadPlayers)
                .ToListAsync();

            // 3. Fetch performance points for all players
            var allPerformances = await _context.PlayerPerformances.ToListAsync();

            var leaderboardEntries = new List<LeaderboardEntryDto>();

            foreach (var squad in squads)
            {
                if (squad.User == null) continue;

                int totalPoints = 0;
                int latestGwPoints = 0;

                foreach (var squadPlayer in squad.SquadPlayers.Where(sp => sp.IsStarter))
                {
                    var playerPerformances = allPerformances
                        .Where(p => p.PlayerId == squadPlayer.PlayerId);

                    foreach (var perf in playerPerformances)
                    {
                        // Base points calculation (Goal=4, Assist=3, CleanSheet=4, Save=5, Bonus)
                        int pts = (perf.GoalsScored * 4) +
                                  (perf.Assists * 3) +
                                  (perf.CleanSheet * 4) +
                                  (perf.PenaltySaves * 5) +
                                  perf.BonusPoints -
                                  (perf.YellowCards * 1) -
                                  (perf.RedCards * 3);

                        // Apply Captain Multiplier
                        if (squadPlayer.IsCaptain)
                        {
                            pts *= 2;
                        }

                        totalPoints += pts;

                        if (latestGameweek != null && perf.FixtureId != 0)
                        {
                            latestGwPoints += pts;
                        }
                    }
                }

                leaderboardEntries.Add(new LeaderboardEntryDto
                {
                    UserId = squad.User.Id,
                    Username = squad.User.Username,
                    TeamName = squad.User.TeamName,
                    TotalPoints = totalPoints,
                    LatestGameweekPoints = latestGwPoints
                });
            }

            // 4. Sort standings descending by points and assign rank numbers
            var sortedStandings = leaderboardEntries
                .OrderByDescending(e => e.TotalPoints)
                .ThenBy(e => e.TeamName)
                .Select((entry, index) =>
                {
                    entry.Rank = index + 1;
                    return entry;
                })
                .ToList();

            return Ok(new LeaderboardResponseDto
            {
                TotalManagers = leaderboardEntries.Count,
                CompletedGameweeks = completedGameweekIds.Count,
                Standings = sortedStandings
            });
        }
    }
}