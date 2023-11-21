using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace back.Models
{
    public class Favorite
    {
        public Guid Id { get; set; }

        public Guid LakeSightingId { get; set; }

        public string UserId { get; set; }

    }
}