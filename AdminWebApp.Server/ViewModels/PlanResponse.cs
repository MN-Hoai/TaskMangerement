using System.Collections.Generic;

namespace AdminWebApp.Server.ViewModels
{
    public class PlanResponse
    {
        public int PlanId { get; set; }
        public string PlanName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Tag { get; set; }
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public int CreatedById { get; set; }
        public string CreatedByName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public System.Collections.Generic.List<AssigneeResponse> Assignees { get; set; } = new System.Collections.Generic.List<AssigneeResponse>();
        public int TaskCount { get; set; }
        public int Progress { get; set; }
    }
}