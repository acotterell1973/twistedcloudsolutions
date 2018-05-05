using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Shared.Kernel
{
    public class Guard
    {
        public static void ForLessEqualZero(int value, string parameterName)
        {
            if (value <= 0)
            {
                throw new ArgumentOutOfRangeException(parameterName);
            }
        }

        public static void ForPrecedesDate(DateTime value, DateTime dateToPrecede, string parameterName)
        {
            if (value >= dateToPrecede)
            {
                throw new ArgumentOutOfRangeException(parameterName);
            }
        }

        public static void ForNullOrEmpty(string value, string parameterName)
        {
            if (String.IsNullOrEmpty(value))
            {
                throw new ArgumentOutOfRangeException(parameterName);
            }
        }

        public static void ForInvalidEnum<T>(int value)
        {
           
            if (!System.Enum.IsDefined(typeof(T), value))
                throw new InvalidEnumArgumentException(nameof(value), value, typeof(T));
        }
    }
}
