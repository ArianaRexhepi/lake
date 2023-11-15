using backend.Models;

namespace back.Models
{
    public class LakeSighting
    {
        public Guid Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public AppUser User { get; set; }
        public string UserId { get; set; }
        public Lake Lake { get; set; }
        public Guid LakeId { get; set; }
        public string Image { get; set; }

    }
}