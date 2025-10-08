using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class ChangePasswordRequest
    {
        [JsonPropertyName("currentPassword")]
        public string CurrentPassword { get; set; }

        [JsonPropertyName("newPassword")]
        public string NewPassword { get; set; }

        public ChangePasswordRequest()
        {
            CurrentPassword = string.Empty;
            NewPassword = string.Empty;
        }

        public ChangePasswordRequest(string currentPassword, string newPassword)
        {
            CurrentPassword = currentPassword;
            NewPassword = newPassword;
        }
    }
}
