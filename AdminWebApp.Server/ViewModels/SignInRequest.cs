using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class SignInRequest
    {
        [Required]
        [JsonPropertyName("username")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [JsonPropertyName("password")]
        public string Password { get; set; } = string.Empty;
    }
}
