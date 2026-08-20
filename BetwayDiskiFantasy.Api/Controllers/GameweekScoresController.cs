using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetwayDiskiFantasy.Api.Data;
using BetwayDiskiFantasy.Api.DTOs;
using BetwayDiskiFantasy.Api.Models;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameweekScoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameweekScoresController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetGameweekScores()
        {
            return await _context.Players.ToListAsync();
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetGameweekSummary()
        {
            var players = await _context.Players.ToListAsync();

            var pitchPlayers = players.Where(p => !p.IsBench).ToList();
            var benchPlayers = players.Where(p => p.IsBench).ToList();

            var totalPoints = pitchPlayers.Sum(p => p.TotalPoints);

            var summary = new
            {
                TotalPitchPoints = totalPoints,
                PitchCount = pitchPlayers.Count,
                BenchCount = benchPlayers.Count,
                TopScorer = players.OrderByDescending(p => p.TotalPoints).FirstOrDefault()?.Name,
                TopScorerTeam = players.OrderByDescending(p => p.TotalPoints).FirstOrDefault()?.TeamName
            };

            return Ok(summary);
        }

        [HttpPost("recalculate")]
        public async Task<IActionResult> RecalculateScores()
        {
            var players = await _context.Players.ToListAsync();

            foreach (var player in players)
            {
                // Gameweek calculation logic placeholder
                if (player.Position == "FWD")
                {
                    player.TotalPoints += 4;
                }
                else if (player.Position == "MID")
                {
                    player.TotalPoints += 3;
                }
                else if (player.Position == "DEF" || player.Position == "GK")
                {
                    player.TotalPoints += 2;
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Gameweek scores recalculated successfully." });
        }
    }
}