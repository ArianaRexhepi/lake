using System.ComponentModel.DataAnnotations;

namespace back.Models
{
    public class Lake
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }

        public ICollection<LakeSighting> LakeSightings { get; set; }

    }
}