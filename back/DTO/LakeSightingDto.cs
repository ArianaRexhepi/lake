using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class LakeSightingDto
    {
        public Guid Id { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public Guid LakeId { get; set; }
        [Required]
        public string Image { get; set; }

    }
}