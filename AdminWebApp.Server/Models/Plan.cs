using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminWebApp.Server.Models
{
    public class Plan
    {
        [Key]
        public int PlanId { get; set; }

        [Required]
        [StringLength(150)]
        public string PlanName { get; set; }

        public string? Description { get; set; }

        [StringLength(50)]
        public string? Tag { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? CreatedById { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(20)]
        public string? Priority { get; set; }

        [ForeignKey("CreatedById")]
        public Employee? CreatedBy { get; set; }
    }
}
