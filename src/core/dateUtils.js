function getTZDateParts(date, tzService, tz) {
  if (!tz) {
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      date: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds()
    };
  }

  const d = tzService.convert(date, tz); // create date object adjusted to tz

  return {
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds()
  };
}


function addMonths(date, count, tzService, tz) {
  const parts = getTZDateParts(date, tzService, tz);

  // target Y/M
  let y = parts.year;
  let m = parts.month + count;

  y += Math.floor(m / 12);
  m = (m % 12 + 12) % 12;

  // create resulting date in wall-clock
  const result = tz
    ? tzService.create(zToLocal(y, m, parts.date, parts.hour, parts.minute, parts.second), tz)
    : new Date(Date.UTC(y, m, parts.date, parts.hour, parts.minute, parts.second));

  return result;
}


function addYears(date, count, tzService, tz) {
  const parts = getTZDateParts(date, tzService, tz);

  const y = parts.year + count;
  const m = parts.month;

  const result = tz
    ? tzService.create({
      year: y,
      month: m,
      date: parts.date,
      hour: parts.hour,
      minute: parts.minute,
      second: parts.second
    }, tz)
    : new Date(Date.UTC(y, m, parts.date, parts.hour, parts.minute, parts.second));

  return result;
}

module.exports = {
  getTZDateParts,
  addMonths,
  addYears
};
