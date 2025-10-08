using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminWebApp.Server.Models
{
    public class TaskDetail
    {
        [Key]
        public int TaskId { get; set; }

        public int? PlanId { get; set; }

        [Required]
        [StringLength(150)]
        public string TaskName { get; set; }

        public string? Description { get; set; }
        public string? Requirement { get; set; }
        public string? AttachmentPath { get; set; }
      
        
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [StringLength(20)]
        public string? Priority { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }
        public string? Category { get; set; }
        public int CreatedById { get; set; }
      

        [ForeignKey("PlanId")]
        public Plan? Plan { get; set; }

        public List<TaskAssignees> TaskAssignees { get; set; } = new List<TaskAssignees>();

    }
}
