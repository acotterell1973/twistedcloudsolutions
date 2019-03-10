using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using SkiaSharp;
using static System.String;

namespace TwistedCloud.VideoProcessor.Component
{
    public class FileUploadMultipartFormDataStreamProvider : MultipartStreamProvider
    {
        //http://social.technet.microsoft.com/wiki/contents/articles/23787.asp-net-webapi-2-stream-windows-azure-blobs.aspx
        //http://stackoverflow.com/questions/25454638/request-content-readasmultipartasync-throws-system-io-exception
        private readonly string _containerName;
        private readonly string _connectionStringName;
        private readonly string _orgFilename;
        private string _filename;
        private CloudBlockBlob _blockBlob;
        private CloudBlobContainer _container;
        private CloudBlobStream _stream;
        private ImageFormat _pngExtension;


        public List<FileDetails> Files { get; set; }
        public bool ResizeAndUpload { get; set; }
        private readonly string[] _supportedMimeTypes = { "image/png", "image/jpeg", "image/jpg" };

        public FileUploadMultipartFormDataStreamProvider(string connectionStringName, string containerName, string fileName)   
        {
            Files = new List<FileDetails>();
            _containerName = containerName;
            _connectionStringName = connectionStringName;
            _filename = fileName;
            _orgFilename = fileName;
        }

        public override Stream GetStream(HttpContent parent, HttpContentHeaders headers)
        {
            if (parent == null) throw new ArgumentNullException(nameof(parent));
            if (headers == null) throw new ArgumentNullException(nameof(headers));

            if (!_supportedMimeTypes.Contains(headers.ContentType.ToString().ToLower()))
            {
                throw new NotSupportedException("Only jpeg and png are supported");
            }

            var fileName = UnquoteString(headers.ContentDisposition.FileName);

            _pngExtension = ImageFormat.Png;
            var fileNameExtension = "." + _pngExtension;
            
            if (!IsNullOrWhiteSpace(fileName))
            {
                 fileNameExtension = Path.GetExtension(fileName);
            }

            if (IsNullOrWhiteSpace(_filename))
            {
                throw new FileNotFoundException("This request is not properly formatted.");
            }
            _filename = _filename + fileNameExtension;

            var storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(_connectionStringName));
            var imagesBlobClient = storageAccount.CreateCloudBlobClient();
            _container = imagesBlobClient.GetContainerReference(_containerName);

            _blockBlob = _container.GetBlockBlobReference(_filename);
            
            _stream =  _blockBlob.OpenWriteAsync().Result;
            return _stream;
        }

        public override Task ExecutePostProcessingAsync()
        {
            Files.Add(new FileDetails
            {
                ContentType = _blockBlob.Properties.ContentType,
                Name = _blockBlob.Name,
                Size = _blockBlob.Properties.Length,
                Location = _blockBlob.Uri.AbsoluteUri,
                RawStream = _stream
            });

            if (!ResizeAndUpload) return base.ExecutePostProcessingAsync();

            MemoryStream rawStream;
            using (rawStream = new MemoryStream())
            {
                _blockBlob.DownloadToStreamAsync(rawStream);
           //     var thumbnail = ResizeImage(rawStream);
                var filename  = _orgFilename + "_thumbnail." + _pngExtension;
              //  Upload(thumbnail, filename);
            }
            return base.ExecutePostProcessingAsync();
        }

        //public void Upload(MediaTypeNames.Image image, string imageName)
        //{
        //    if (_pngExtension == null)
        //    {
        //        _pngExtension = ImageFormat.Png;
        //        var fNameExtension = "." + _pngExtension;
        //        _filename = imageName + fNameExtension;

        //        var storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(_connectionStringName));
        //        var imagesBlobClient = storageAccount.CreateCloudBlobClient();

        //        _container = imagesBlobClient.GetContainerReference(_containerName);
        //        _blockBlob = _container.GetBlockBlobReference(_filename);
        //        _stream = _blockBlob.OpenWriteAsync().Result;
        //    } 

        //    var imageStream = image.ToStream(_pngExtension);
        //    _blockBlob = _container.GetBlockBlobReference(imageName);
        //    // Async upload of stream to Storage
        //    var uploadCompleted = new AsyncCallback(OnUploadCompleted);
        //    _blockBlob.UploadFromStreamAsync(imageStream);
        //}

        private void OnUploadCompleted(IAsyncResult result)
        {
            var blob = (CloudBlockBlob)result.AsyncState;
            blob.SetMetadataAsync();
       //     blob.EndUploadFromStream(result);
        }

        //private MediaTypeNames.Image ResizeImage(Stream imageStream)
        //{
        //    var image = MediaTypeNames.Image.FromStream(imageStream);
        //    var thumbnailSize = GetThumbnailSize(image);
        //    var thumbnail = image.GetThumbnailImage(thumbnailSize.Width, thumbnailSize.Height, null, IntPtr.Zero);
        //    return thumbnail;
        //}

        private static void ResizeImage()
        {
            var resizeFactor = 0.5f;
            var bitmap = SKBitmap.Decode("input.jpg");
            var toBitmap = new SKBitmap((int)Math.Round(bitmap.Width * resizeFactor), (int)Math.Round(bitmap.Height * resizeFactor), bitmap.ColorType, bitmap.AlphaType);

            var canvas = new SKCanvas(toBitmap);
            // Draw a bitmap rescaled
            canvas.SetMatrix(SKMatrix.MakeScale(resizeFactor, resizeFactor));
            canvas.DrawBitmap(bitmap, 0, 0);
            canvas.ResetMatrix();

            var font = SKTypeface.FromFamilyName("Arial");
            var brush = new SKPaint
            {
                Typeface = font,
                TextSize = 64.0f,
                IsAntialias = true,
                Color = new SKColor(255, 255, 255, 255)
            };
            canvas.DrawText("Resized!", 0, bitmap.Height * resizeFactor / 2.0f, brush);

            canvas.Flush();

            var image = SKImage.FromBitmap(toBitmap);
            var data = image.Encode(SKImageEncodeFormat.Jpeg, 90);

            using (var stream = new FileStream("output.jpg", FileMode.Create, FileAccess.Write))
                data.SaveTo(stream);

            data.Dispose();
            image.Dispose();
            canvas.Dispose();
            brush.Dispose();
            font.Dispose();
            toBitmap.Dispose();
            bitmap.Dispose();
        }

        //private static Size GetThumbnailSize(MediaTypeNames.Image original)
        //{
        //    const int maxPixels = 80;

        //    var originalWidth = original.Width;
        //    var originalHeight = original.Height;

        //    double factor;
        //    if (originalWidth > originalHeight)
        //    {
        //        factor = (double)maxPixels / originalWidth;
        //    }
        //    else
        //    {
        //        factor = (double)maxPixels / originalHeight;
        //    }
        //    return new Size((int)(originalWidth * factor), (int)(originalHeight * factor));   
        //}
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        private static string UnquoteString(string fileName)
        {
            if (IsNullOrWhiteSpace(fileName))
            {
                return fileName;
            }

            if (fileName.StartsWith("\"", StringComparison.Ordinal) && fileName.EndsWith("\"", StringComparison.Ordinal) && fileName.Length > 1)
            {
                return fileName.Substring(1, fileName.Length - 2);
            }

            return fileName;
        }

    }

    public class FileDetails
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public string ContentType { get; set; }
        public string Location { get; set; }
        public Stream RawStream { get; set; }
    }
}
