const Arithmetic = require("./Arithmetic");

function _humanizeDiff(ms, localePack, withoutSuffix = false) {
  const abs = Math.abs(ms);
  const isFuture = ms >= 0;

  const s = Math.round(abs / 1000);
  const m = Math.round(s / 60);
  const h = Math.round(m / 60);
  const d = Math.round(h / 24);
  const mo = Math.round(d / 30);
  const y = Math.round(d / 365);

  const dict = isFuture ? localePack.humanize.future : localePack.humanize.past;

  if (s < 45) return dict.seconds;
  if (s < 90) return dict.minute;
  if (m < 45) return dict.minutes(m);
  if (m < 90) return dict.hour;
  if (h < 22) return dict.hours(h);
  if (h < 36) return dict.day;
  if (d < 26) return dict.days(d);
  if (d < 45) return dict.month;
  if (mo < 11) return dict.months(mo);
  if (mo < 18) return dict.year;
  return dict.years(y);
}

function from(aInstance, bInstance, localePack, withSuffix = true) {
  const aDate = aInstance._raw;
  const bDate = bInstance._raw;
  const ms = aDate.getTime() - bDate.getTime();
  return _humanizeDiff(ms, localePack, !withSuffix);
}

function calendar(aInstance, refInstance, localePack) {
  const a = aInstance._raw;
  const r = refInstance._raw;

  const startRef = new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate()));
  const startA = new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()));

  const dayDiff = Math.floor((startA - startRef) / (24 * 3600 * 1000));

  const time = aInstance.format("HH:mm");
  const weekday = aInstance.format("dddd");

  if (dayDiff === 0) return localePack.calendar.sameDay(time);
  if (dayDiff === 1) return localePack.calendar.nextDay(time);
  if (dayDiff === -1) return localePack.calendar.lastDay(time);
  if (dayDiff > 0 && dayDiff < 7) return localePack.calendar.nextWeek(weekday, time);
  if (dayDiff < 0 && dayDiff > -7) return localePack.calendar.lastWeek(weekday, time);

  // Fallback
  const full = aInstance.format("DD/MM/YYYY");
  return localePack.calendar.sameElse(full);
}


module.exports = { from, calendar };
