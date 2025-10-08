using System.ComponentModel.DataAnnotations;

namespace AdminWebApp.Server.Models
{
    public class TaskCategory
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; }
    }
}
