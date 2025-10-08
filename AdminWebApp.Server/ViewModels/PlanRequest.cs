using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AdminWebApp.Server.ViewModels
{
    public class PlanRequest
    {
        public string PlanName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Tag { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int CreatedById { get; set; }
        public string Status { get; set; } = "Not Started";
        public string Priority { get; set; } = "Trung bình";
        public System.Collections.Generic.List<int> Assignees { get; set; } = new System.Collections.Generic.List<int>();
        public int TaskCount { get; set; }
    }
}