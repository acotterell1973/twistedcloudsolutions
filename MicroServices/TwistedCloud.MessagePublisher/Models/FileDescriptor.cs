namespace TwistedCloud.MessagePublisher.Models
{
    public class FileDescriptor
    {
        /// <summary>
        /// Owner of the media
        /// </summary>
        public string UserId { get; set; }
        /// <summary>
        /// The location of the media file
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// Video or Image
        /// </summary>
        public string MediaType { get; set; }
        /// <summary>
        /// Is the media format mp4, jpg, png, etc
        /// </summary>
        public string MediaFormat { get; set; }
        /// <summary>
        /// Source of the upload, etc: Mobile App Name or Website Name
        /// </summary>
        public string MediaSource { get; set; }

    }
}
