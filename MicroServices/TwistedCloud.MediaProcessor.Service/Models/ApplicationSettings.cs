using Newtonsoft.Json;

namespace TwistedCloud.MediaProcessor.Service.Models
{
    [JsonObject("application")] 
    public class ApplicationSettings
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
