using System;

namespace Shared.Kernel
{
    public class DateTimeRange : ValueObject<DateTimeRange>
    {
        public DateTime Start { get; }
        public DateTime End { get; }

        public DateTimeRange(DateTime start, DateTime end)
        {
            Start = start;
            End = end;
        }

        public DateTimeRange(DateTime start, TimeSpan duration)
        {
            Start = start;
            End = start.Add(duration);
        }
        protected DateTimeRange() { }

        public int DurationInMinutes()
        {
            return (End - Start).Minutes;
        }

        public DateTimeRange NewEnd(DateTime newEnd)
        {
            return new DateTimeRange(Start, newEnd);
        }
        public DateTimeRange NewDuration(TimeSpan newDuration)
        {
            return new DateTimeRange(Start, newDuration);
        }
        public DateTimeRange NewStart(DateTime newStart)
        {
            return new DateTimeRange(newStart, End);
        }

        public static DateTimeRange CreateOneDayRange(DateTime day)
        {
            return new DateTimeRange(day, day.AddDays(1));
        }

        public static DateTimeRange CreateOneWeekRange(DateTime startDay)
        {
            return new DateTimeRange(startDay, startDay.AddDays(7));
        }

        public bool Overlaps(DateTimeRange dateTimeRange)
        {
            return Start < dateTimeRange.End &&
                   End > dateTimeRange.Start;
        }
    }
}
