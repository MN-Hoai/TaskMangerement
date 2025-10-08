using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class UploadRequest
    {
        [JsonPropertyName("url")]
        public string Url { get; set; }

        public UploadRequest()
        {
            Url = string.Empty;
        }

        public UploadRequest(string url)
        {
            Url = url;
        }
    }
}
