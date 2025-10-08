using System.Text.Json.Serialization;

namespace AdminWebApp.Server.ViewModels
{
    public class OptionItemResponse
    {
        [JsonPropertyName("value")]
        public string Value { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("selected")]
        public bool Selected { get; set; }

        public OptionItemResponse()
        {
            Value = string.Empty;
            Text = string.Empty;
            Selected = false;
        }

        public OptionItemResponse(string value, string text, bool selected)
        {
            Value = value;
            Text = text;
            Selected = selected;
        }
    }
}
