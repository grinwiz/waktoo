const { getTZDateParts, addMonths, addYears } = require("./dateUtils");

const MS = {
  second: 1000,
  minute: 60_000,
  hour: 3_600_000,
  day: 86_400_000,
  week: 604_800_000
};

function diffCalendar(start, end, tzService, tz) {
  const s = getTZDateParts(start, tzService, tz);
  const e = getTZDateParts(end, tzService, tz);

  // Clone safe start parts
  let y = s.year;
  let m = s.month;
  let d = s.date;

  let years = e.year - y;
  while (true) {
    const t = addYears(start, years, tzService, tz);
    if (t > end) {
      years--;
    } else break;
  }

  const afterYears = addYears(start, years, tzService, tz);

  let months = (e.year * 12 + e.month) - (s.year * 12 + s.month) - years * 12;
  while (true) {
    const t = addMonths(afterYears, months, tzService, tz);
    if (t > end) {
      months--;
    } else break;
  }

  const afterMonths = addMonths(afterYears, months, tzService, tz);

  const remainingMs = end - afterMonths;

  let days = Math.floor(remainingMs / MS.day);
  let hours = Math.floor((remainingMs - days * MS.day) / MS.hour);
  let minutes = Math.floor((remainingMs - days * MS.day - hours * MS.hour) / MS.minute);
  let seconds = Math.floor(
    (remainingMs - days * MS.day - hours * MS.hour - minutes * MS.minute) / MS.second
  );

  return { years, months, days, hours, minutes, seconds };
}

function calendarUnitCount(start, end, tzService, tz, unit) {
  const sign = end >= start ? 1 : -1;
  let count = 0;

  if (unit === "year") {
    while (true) {
      const t = addYears(start, count + 1 * sign, tzService, tz);
      if ((sign === 1 && t <= end) || (sign === -1 && t >= end)) {
        count += sign;
      } else break;
    }
  }

  if (unit === "month") {
    while (true) {
      const t = addMonths(start, count + 1 * sign, tzService, tz);
      if ((sign === 1 && t <= end) || (sign === -1 && t >= end)) {
        count += sign;
      } else break;
    }
  }

  return Math.abs(count);
}

function formatDetailed(parts, localePack) {
  const out = [];

  function push(v, singular, plural) {
    if (v > 0) {
      const word = v === 1 ? localePack.units[singular] : localePack.units[plural];
      out.push(`${v} ${word}`);
    }
  }

  push(parts.years, "year", "years");
  push(parts.months, "month", "months");
  push(parts.days, "day", "days");
  push(parts.hours, "hour", "hours");
  push(parts.minutes, "minute", "minutes");
  push(parts.seconds, "second", "seconds");

  return out.length > 0 ? out.join(" ") : `0 ${localePack.units.seconds}`;
}

function formatSingleUnit(count, unit, localePack) {
  const isSingular = count === 1;
  const word = localePack.units[unit + (isSingular ? "" : "s")] || localePack.units[unit];
  return `${count} ${word}`;
}

module.exports = {
  diffCalendar,
  
  calendarUnitCount,
  formatDetailed,
  formatSingleUnit
};
