using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdminWebApp.Server.Models
{
    public class TaskAssignees
    {
        public int TaskId { get; set; }
        public int EmployeeId { get; set; }
        public TaskDetail? Task { get; set; }
        public Employee? Employee { get; set; }

    }
}
