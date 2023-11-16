using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using backend.DTO;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LakeSightingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LakeSightingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetLakeSightings(Guid Id)
        {
            var lake = await _context.Lakes.Include(a => a.LakeSightings).FirstOrDefaultAsync(b => b.Id == Id);
            return Ok(lake.LakeSightings);
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync(LakeSightingDto lakeSighting)
        {
            var user = await _context.Users.FirstOrDefaultAsync(a => a.Id == lakeSighting.UserId);
            if (user == null) return BadRequest("User not found!");
            var lake = await _context.Lakes.FirstOrDefaultAsync(b => b.Id == lakeSighting.LakeId);
            if (lake == null) return BadRequest("Lake not found!");
            var newLakeSigting = new LakeSighting
            {
                Longitude = lakeSighting.Longitude,
                Latitude = lakeSighting.Latitude,
                User = user,
                UserId = lakeSighting.UserId,
                Lake = lake,
                LakeId = lakeSighting.LakeId,
                Image = lakeSighting.Image
            };

            _context.LakeSightings.Add(newLakeSigting);
            user.LakeSightings.Add(newLakeSigting);
            lake.LakeSightings.Add(newLakeSigting);
            

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Failed to add Lake Sighting");
            return Ok();
        }

    }
}
