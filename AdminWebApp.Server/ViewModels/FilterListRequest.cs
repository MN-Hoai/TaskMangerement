using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class FilterListRequest
    {
        [JsonPropertyName("category")]
        public string? Category { get; set; }

        [JsonPropertyName("keyword")]
        public string? Keyword { get; set; }

        [JsonPropertyName("page")]
        public int? Page { get; set; }

        public FilterListRequest()
        {
            Category = string.Empty;
            Keyword = string.Empty;
            Page = 1;
        }

        public FilterListRequest(string category, string keyword, int page)
        {
            Category = category;
            Keyword = keyword;
            Page = page;
        }
    }
}