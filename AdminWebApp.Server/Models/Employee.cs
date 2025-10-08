using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminWebApp.Server.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        [StringLength(50)]
        public string? Account { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [StringLength(50)]
        public string? Position { get; set; }

        [StringLength(50)]
        public string? Department { get; set; }

        public int? superior { get; set; }

        public bool? Status { get; set; }

        [ForeignKey("superior")]
        public Employee? Superior { get; set; }
    }
}
