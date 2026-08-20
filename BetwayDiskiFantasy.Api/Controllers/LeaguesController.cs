using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BetwayDiskiFantasy.Api.Controllers
{
    public class LeagueStandingDto
    {
        public int Rank { get; set; }
        public string ManagerName { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public int TotalPoints { get; set; }
        public int EventPoints { get; set; }
    }

    public class LeagueDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public List<LeagueStandingDto> Standings { get; set; } = new();
    }

    [ApiController]
    [Route("api/[controller]")]
    public class LeaguesController : ControllerBase
    {
        [HttpGet("user/{userId}")]
        public IActionResult GetUserLeagues(int userId)
        {
            var leagues = new List<LeagueDto>
            {
                new LeagueDto
                {
                    Id = 1,
                    Name = "Betway Premiership Official",
                    Code = "DISKI2026",
                    Standings = new List<LeagueStandingDto>
                    {
                        new LeagueStandingDto { Rank = 1, ManagerName = "Sipho M.", TeamName = "AmaZulu Kings", TotalPoints = 482, EventPoints = 65 },
                        new LeagueStandingDto { Rank = 2, ManagerName = "Liyema", TeamName = "Diski Master FC", TotalPoints = 465, EventPoints = 72 },
                        new LeagueStandingDto { Rank = 3, ManagerName = "Thabo N.", TeamName = "Soweto Giants", TotalPoints = 450, EventPoints = 58 },
                        new LeagueStandingDto { Rank = 4, ManagerName = "Kagiso P.", TeamName = "Kasi XI", TotalPoints = 438, EventPoints = 61 },
                        new LeagueStandingDto { Rank = 5, ManagerName = "Bantu Z.", TeamName = "Masandawana", TotalPoints = 421, EventPoints = 50 },
                    }
                },
                new LeagueDto
                {
                    Id = 2,
                    Name = "Eastern Cape Champs",
                    Code = "ECP2026",
                    Standings = new List<LeagueStandingDto>
                    {
                        new LeagueStandingDto { Rank = 1, ManagerName = "Liyema", TeamName = "Diski Master FC", TotalPoints = 465, EventPoints = 72 },
                        new LeagueStandingDto { Rank = 2, ManagerName = "Avo N.", TeamName = "Chilli Boys Fanatic", TotalPoints = 442, EventPoints = 60 },
                        new LeagueStandingDto { Rank = 3, ManagerName = "Mandla S.", TeamName = "Fort Hare Stars", TotalPoints = 410, EventPoints = 54 },
                    }
                }
            };

            return Ok(leagues);
        }
    }
}