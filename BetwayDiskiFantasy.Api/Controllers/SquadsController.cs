using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BetwayDiskiFantasy.Api.Data;
using BetwayDiskiFantasy.Api.Models;

namespace BetwayDiskiFantasy.Api.Controllers
{
    public class SetRoleRequestDto
    {
        public int UserId { get; set; }
        public int CaptainId { get; set; }
        public int ViceCaptainId { get; set; }
    }

    public class PitchPlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string WebName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsCaptain { get; set; }
        public bool IsViceCaptain { get; set; }
        public bool IsBench { get; set; }
        public int RawPoints { get; set; }
        public int EffectivePoints => IsCaptain ? RawPoints * 2 : RawPoints;
    }

    [ApiController]
    [Route("api/[controller]")]
    public class SquadsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SquadsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetSquad(int userId)
        {
            var players = await _context.Players.ToListAsync();

            if (!players.Any())
            {
                return NotFound(new { Message = "No players found in database." });
            }

            var squad = players.Select((p, index) => new PitchPlayerDto
            {
                Id = p.Id,
                Name = p.Name,
                WebName = string.IsNullOrEmpty(p.WebName) ? p.Name : p.WebName,
                Position = p.Position,
                Team = p.TeamName,
                Price = p.Price,
                IsBench = p.IsBench,
                RawPoints = p.TotalPoints,
                IsCaptain = index == 0,      // Default captain
                IsViceCaptain = index == 1   // Default vice-captain
            }).ToList();

            return Ok(squad);
        }

        [HttpPost("roles")]
        public async Task<IActionResult> SetRoles([FromBody] SetRoleRequestDto request)
        {
            if (request.CaptainId == request.ViceCaptainId)
            {
                return BadRequest(new { Success = false, Message = "Captain and Vice-Captain cannot be the same player." });
            }

            var players = await _context.Players.ToListAsync();

            var squad = players.Select(p => new PitchPlayerDto
            {
                Id = p.Id,
                Name = p.Name,
                WebName = string.IsNullOrEmpty(p.WebName) ? p.Name : p.WebName,
                Position = p.Position,
                Team = p.TeamName,
                Price = p.Price,
                IsBench = p.IsBench,
                RawPoints = p.TotalPoints,
                IsCaptain = (p.Id == request.CaptainId),
                IsViceCaptain = (p.Id == request.ViceCaptainId)
            }).ToList();

            return Ok(new
            {
                Success = true,
                Message = "Squad roles updated successfully.",
                Squad = squad
            });
        }
    }
}