using Microsoft.AspNetCore.Mvc;
using BetwayDiskiFantasy.Api.DTOs;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FixturesController : ControllerBase
    {
        private static readonly List<FixtureDto> Fixtures = new()
        {
            new FixtureDto 
            { 
                Id = 1, 
                HomeTeam = "Mamelodi Sundowns", 
                AwayTeam = "Orlando Pirates", 
                KickOffTime = DateTime.UtcNow.AddDays(2), 
                Gameweek = 1, 
                IsFinished = false 
            },
            new FixtureDto 
            { 
                Id = 2, 
                HomeTeam = "Kaizer Chiefs", 
                AwayTeam = "Stellenbosch FC", 
                KickOffTime = DateTime.UtcNow.AddDays(3), 
                Gameweek = 1, 
                IsFinished = false 
            },
            new FixtureDto 
            { 
                Id = 3, 
                HomeTeam = "SuperSport United", 
                AwayTeam = "Cape Town City", 
                KickOffTime = DateTime.UtcNow.AddDays(3), 
                Gameweek = 1, 
                IsFinished = false 
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<FixtureDto>> GetFixtures()
        {
            return Ok(Fixtures);
        }

        [HttpGet("{id}")]
        public ActionResult<FixtureDto> GetFixture(int id)
        {
            var fixture = Fixtures.FirstOrDefault(f => f.Id == id);
            if (fixture == null)
            {
                return NotFound();
            }
            return Ok(fixture);
        }
    }
}