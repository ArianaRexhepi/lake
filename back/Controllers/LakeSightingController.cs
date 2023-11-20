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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLakeSightings(Guid id)
        {
            var lake = await _context.Lakes.Include(a => a.LakeSightings).FirstOrDefaultAsync(b => b.Id == id);
            if (lake == null) return BadRequest("Lake not found!");
            var lakelist = new List<LakeSightingDto>();
            foreach (var sighting in lake.LakeSightings)
            {
                var lakeSighting = new LakeSightingDto
                {
                    Id = sighting.Id,
                    Longitude = sighting.Longitude,
                    Latitude = sighting.Latitude,
                    UserId = sighting.UserId,
                    LakeId = sighting.LakeId,
                    Image = sighting.Image

                };
                lakelist.Add(lakeSighting);
            }
            return Ok(lakelist);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingSighting = await _context.LakeSightings.FindAsync(id);
            _context.LakeSightings.Remove(existingSighting);

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Failed to delete Lake Sighting");
            return Ok();
        }

    }
}
