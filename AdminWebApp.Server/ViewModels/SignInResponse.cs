using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class SignInResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; } = false;

        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;

        [JsonPropertyName("token")]
        public string Token { get; set; } = string.Empty;
    }
}
