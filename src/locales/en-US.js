module.exports = {
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  monthsLong: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  AM: "AM",
  PM: "PM",

  humanize: {
    past: {
      seconds: "a few seconds ago",
      minute: "1 minute ago",
      minutes: n => `${n} minutes ago`,
      hour: "1 hour ago",
      hours: n => `${n} hours ago`,
      day: "a day ago",
      days: n => `${n} days ago`,
      month: "1 month ago",
      months: n => `${n} months ago`,
      year: "1 year ago",
      years: n => `${n} years ago`
    },
    future: {
      seconds: "in a few seconds",
      minute: "in 1 minute",
      minutes: n => `in ${n} minutes`,
      hour: "in 1 hour",
      hours: n => `in ${n} hours`,
      day: "in a day",
      days: n => `in ${n} days`,
      month: "in 1 month",
      months: n => `in ${n} months`,
      year: "in 1 year",
      years: n => `in ${n} years`
    },
    none: {
      seconds: "a few seconds",
      minute: "1 minute",
      minutes: n => `${n} minutes`,
      hour: "1 hour",
      hours: n => `${n} hours`,
      day: "1 day",
      days: n => `${n} days`,
      month: "1 month",
      months: n => `${n} months`,
      year: "1 year",
      years: n => `${n} years`
    }
  },

  calendar: {
    sameDay: (time) => `Today at ${time}`,
    nextDay: (time) => `Tomorrow at ${time}`,
    lastDay: (time) => `Yesterday at ${time}`,
    nextWeek: (weekday, time) => `${weekday} at ${time}`,
    lastWeek: (weekday, time) => `${weekday} at ${time}`,
    sameElse: (date) => date
  },

  units: {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    week: "week",
    weeks: "weeks",
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    second: "second",
    seconds: "seconds"
  }
};
