using Newtonsoft.Json;
using System;
using System.Text;

namespace MessageSubscriber
{
    public static class ObjectSerializer
    {
        public static string DeSerializeText(this byte[] arrBytes)
        {
            return Encoding.Default.GetString(arrBytes);
        }

        public static string SerializeToJson(this object obj)
        {
            if (obj == null)
            {
                return null;
            }

            return JsonConvert.SerializeObject(obj);
        }

        public static object DeSerializeFromJson(string json, Type type)
        {
            return JsonConvert.DeserializeObject(json, type);
        }

        public static byte[] SerializeToByteArray(this object obj)
        {
            if (obj == null)
            {
                return null;
            }

            var json = SerializeToJson(obj);
            return Encoding.ASCII.GetBytes(json);
        }

        public static object DeSerializeFromByteArray(this byte[] arrBytes, Type type)
        {
            var json = Encoding.Default.GetString(arrBytes);
            return DeSerializeFromJson(json, type);
        }
    }
}
