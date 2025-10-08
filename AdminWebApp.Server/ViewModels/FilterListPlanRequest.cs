namespace AdminWebApp.Server.ViewModels
{
    public class FilterListPlanRequest
    {
        public string? Tag { get; set; }
        public string? Keyword { get; set; }
        public string? AssigneeId { get; set; }
        public int? Page { get; set; }
    }
}
