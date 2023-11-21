using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;
using backend.DTO;
using System.Security.Claims;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _accessor;

        public FavoriteController(ApplicationDbContext context, IHttpContextAccessor accessor)
        {
            _accessor = accessor;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            var id = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var favorites = await _context.Favorites.Where(a => a.UserId == id).ToListAsync();
            return Ok(favorites);
        }

        [HttpGet("sighting")]
        public async Task<IActionResult> GetFavoritesSighting()
        {
            var id = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var favorites = await _context.Favorites.Where(a => a.UserId == id).ToListAsync();
            var lakelist = new List<LakeSightingDto>();
            foreach (var fav in favorites)
            {
                var sighting = await _context.LakeSightings.Include(a =>a.Lake).FirstOrDefaultAsync(a=> a.Id == fav.LakeSightingId);
                var lakeSighting = new LakeSightingDto
                {
                    Id = sighting.Id,
                    Longitude = sighting.Longitude,
                    Latitude = sighting.Latitude,
                    UserId = sighting.UserId,
                    LakeId = sighting.LakeId,
                    Image = sighting.Image,
                    Name= sighting.Lake.Name
                };
                lakelist.Add(lakeSighting);
            }
            return Ok(lakelist);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(FavoriteAddDto favoriteAdd)
        {
            var id = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var newFavorite = new Favorite
            {
                Id = new Guid(),
                LakeSightingId = favoriteAdd.SightingId,
                UserId = id
            };

            _context.Favorites.Add(newFavorite);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Failed to add Favorite Lake Sighting");
            return Ok(newFavorite);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var userId = _accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var favorite = await _context.Favorites.FirstOrDefaultAsync(a => a.UserId == userId && a.LakeSightingId == id);
            if (favorite == null) return BadRequest("Favorite Lake not found!");
            _context.Favorites.Remove(favorite);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Failed to delete Lake Sighting");
            return Ok(favorite.Id);
        }

    }
}
