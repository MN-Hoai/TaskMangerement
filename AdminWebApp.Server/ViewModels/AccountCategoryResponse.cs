using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class AccountCategoryResponse
    {
        [JsonPropertyName("accountCategoryID")]
        public string AccountCategoryID { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("avatar")]
        public string Avatar { get; set; }

        [JsonPropertyName("status")]
        public bool? Status { get; set; }

        [JsonPropertyName("position")]
        public int? Position { get; set; }

        // Hàm khởi tạo mặc định
        public AccountCategoryResponse()
        {
            AccountCategoryID = string.Empty;
            Title = string.Empty;
            Description = string.Empty;
            Avatar = string.Empty;
            Status = true; // Giá trị mặc định cho Status
            Position = 0;  // Giá trị mặc định cho Position
        }

        // Hàm khởi tạo đủ tham số
        public AccountCategoryResponse(string accountCategoryID, string title, string description, string avatar, bool? status, int? position)
        {
            AccountCategoryID = accountCategoryID;
            Title = title;
            Description = description;
            Avatar = avatar;
            Status = status;
            Position = position;
        }
    }
}