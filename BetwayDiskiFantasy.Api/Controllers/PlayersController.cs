using Microsoft.AspNetCore.Mvc;
using BetwayDiskiFantasy.Api.DTOs;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private static readonly List<PlayerDto> Players = new()
        {
            new PlayerDto { Id = 101, Name = "Lucas Ribeiro", WebName = "Ribeiro", Position = "FWD", TeamName = "Mamelodi Sundowns", Price = 9.5m, TotalPoints = 48, ImageUrl = "" },
            new PlayerDto { Id = 102, Name = "Relebohile Mofokeng", WebName = "Mofokeng", Position = "MID", TeamName = "Orlando Pirates", Price = 8.0m, TotalPoints = 42, ImageUrl = "" },
            new PlayerDto { Id = 103, Name = "Patrick Maswanganyi", WebName = "Maswanganyi", Position = "MID", TeamName = "Orlando Pirates", Price = 8.5m, TotalPoints = 45, ImageUrl = "" },
            new PlayerDto { Id = 104, Name = "Gaston Sirino", WebName = "Sirino", Position = "MID", TeamName = "Kaizer Chiefs", Price = 7.5m, TotalPoints = 31, ImageUrl = "" },
            new PlayerDto { Id = 105, Name = "Ronwen Williams", WebName = "Williams", Position = "GK", TeamName = "Mamelodi Sundowns", Price = 6.0m, TotalPoints = 38, ImageUrl = "" },
            new PlayerDto { Id = 106, Name = "Fawaaz Basadien", WebName = "Basadien", Position = "DEF", TeamName = "Stellenbosch FC", Price = 5.5m, TotalPoints = 34, ImageUrl = "" },
            new PlayerDto { Id = 107, Name = "Tshegofatso Mabasa", WebName = "Mabasa", Position = "FWD", TeamName = "Orlando Pirates", Price = 8.5m, TotalPoints = 40, ImageUrl = "" },
            new PlayerDto { Id = 108, Name = "Given Msimango", WebName = "Msimango", Position = "DEF", TeamName = "Kaizer Chiefs", Price = 5.0m, TotalPoints = 22, ImageUrl = "" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<PlayerDto>> GetPlayers()
        {
            return Ok(Players);
        }

        [HttpGet("{id}")]
        public ActionResult<PlayerDto> GetPlayer(int id)
        {
            var player = Players.FirstOrDefault(p => p.Id == id);
            if (player == null)
            {
                return NotFound();
            }
            return Ok(player);
        }
    }
}