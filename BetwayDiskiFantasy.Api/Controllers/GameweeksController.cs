using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetwayDiskiFantasy.Api.Data;
using BetwayDiskiFantasy.Api.DTOs;
using BetwayDiskiFantasy.Api.Models;
using BetwayDiskiFantasy.Api.Services;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameweeksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameweeksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/gameweeks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gameweek>>> GetGameweeks()
        {
            return await _context.Gameweeks
                .Include(g => g.Fixtures)
                    .ThenInclude(f => f.HomeTeam)
                .Include(g => g.Fixtures)
                    .ThenInclude(f => f.AwayTeam)
                .ToListAsync();
        }

        // POST: api/gameweeks
        [HttpPost]
        public async Task<ActionResult<Gameweek>> CreateGameweek([FromBody] CreateGameweekDto dto)
        {
            var gameweek = new Gameweek
            {
                Number = dto.Number,
                Name = dto.Name,
                Deadline = dto.Deadline,
                IsFinished = false
            };

            _context.Gameweeks.Add(gameweek);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGameweeks), new { id = gameweek.Id }, gameweek);
        }

        // POST: api/gameweeks/fixtures
        [HttpPost("fixtures")]
        public async Task<ActionResult<Fixture>> CreateFixture([FromBody] CreateFixtureDto dto)
        {
            var homeTeam = await _context.Teams.FindAsync(dto.HomeTeamId);
            var awayTeam = await _context.Teams.FindAsync(dto.AwayTeamId);
            var gw = await _context.Gameweeks.FindAsync(dto.GameweekId);

            if (homeTeam == null || awayTeam == null || gw == null)
            {
                return BadRequest("Invalid HomeTeamId, AwayTeamId, or GameweekId.");
            }

            var fixture = new Fixture
            {
                GameweekId = dto.GameweekId,
                HomeTeamId = dto.HomeTeamId,
                AwayTeamId = dto.AwayTeamId,
                MatchDate = dto.MatchDate,
                IsCompleted = false
            };

            _context.Fixtures.Add(fixture);
            await _context.SaveChangesAsync();

            return Ok(fixture);
        }

        // POST: api/gameweeks/fixtures/results
        // Records player statistics, executes ScoringEngine algorithm, and updates fantasy scores
        [HttpPost("fixtures/results")]
        public async Task<ActionResult> SubmitFixtureResults([FromBody] CompleteFixtureResultDto dto)
        {
            var fixture = await _context.Fixtures
                .Include(f => f.Performances)
                .FirstOrDefaultAsync(f => f.Id == dto.FixtureId);

            if (fixture == null)
            {
                return NotFound($"Fixture with ID {dto.FixtureId} not found.");
            }

            fixture.HomeScore = dto.HomeScore;
            fixture.AwayScore = dto.AwayScore;
            fixture.IsCompleted = true;

            var playerIds = dto.Performances.Select(p => p.PlayerId).ToList();
            var dbPlayers = await _context.Players
                .Where(p => playerIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            foreach (var perfDto in dto.Performances)
            {
                if (!dbPlayers.TryGetValue(perfDto.PlayerId, out var player))
                {
                    continue; // Skip invalid player IDs
                }

                var performance = new PlayerPerformance
                {
                    FixtureId = fixture.Id,
                    PlayerId = player.Id,
                    MinutesPlayed = perfDto.MinutesPlayed,
                    GoalsScored = perfDto.GoalsScored,
                    Assists = perfDto.Assists,
                    CleanSheet = perfDto.KeptCleanSheet ? 1 : 0,
                    GoalsConceded = perfDto.GoalsConceded,
                    YellowCards = perfDto.YellowCards,
                    RedCards = perfDto.RedCards,
                    OwnGoals = perfDto.OwnGoals,
                    PenaltySaves = perfDto.PenaltySaves,
                    PenaltyMisses = perfDto.PenaltyMisses,
                    BonusPoints = perfDto.BonusPoints
                };

                // Execute automated fantasy point calculation
                performance.TotalPoints = ScoringEngine.CalculatePoints(performance, player.Position);

                _context.PlayerPerformances.Add(performance);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = $"Results recorded successfully for Fixture #{fixture.Id}!",
                HomeScore = fixture.HomeScore,
                AwayScore = fixture.AwayScore,
                PlayersProcessed = dto.Performances.Count
            });
        }
    }
}