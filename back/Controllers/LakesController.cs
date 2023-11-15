using Microsoft.AspNetCore.Mvc;
using back.Data;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LakesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LakesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var lakes = await _context.Lakes.ToListAsync();
            return Ok(lakes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLakesAsync(Guid id)
        {
            var existingLake = await _context.Lakes.FindAsync(id);
            if (existingLake == null)
            {
                return NotFound();
            } 
            return Ok(existingLake);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Lake lakes)
        {
           await  _context.Lakes.AddAsync(lakes);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(Guid id, Lake lakes)
        {
            var existingLake = await _context.Lakes.FindAsync(id);
            if (existingLake == null)
            {
                return NotFound();
            }

            existingLake.Name = lakes.Name;
            existingLake.Image = lakes.Image;
            existingLake.Description = lakes.Description;

             _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
       public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var existingLake = await _context.Lakes.FindAsync(id);
            if (existingLake == null)
            {
                return NotFound();
            }

            _context.Lakes.Remove(existingLake);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
