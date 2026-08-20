using Microsoft.AspNetCore.Mvc;
using BetwayDiskiFantasy.Api.DTOs;

namespace BetwayDiskiFantasy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransfersController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<PlayerDto>> GetTransfers()
        {
            return Ok(new List<PlayerDto>());
        }
    }
}