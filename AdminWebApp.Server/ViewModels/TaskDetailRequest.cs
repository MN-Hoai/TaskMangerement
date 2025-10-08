namespace AdminWebApp.Server.ViewModels
{
    public class TaskDetailRequest
    {
        public int PlanId { get; set; }
        public int CreatedById { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Requirement { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
      
        public string? Status { get; set; }
        public string? Priority { get; set; }
        public List<int> Assignees { get; set; } = new List<int>();
        public IFormFile? Attachment { get; set; }
    }
}
