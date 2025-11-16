const MS = {
  ms: 1,
  second: 1000,
  seconds: 1000,
  s: 1000,
  minute: 60 * 1000,
  minutes: 60 * 1000,
  m: 60 * 1000,
  hour: 3600 * 1000,
  hours: 3600 * 1000,
  h: 3600 * 1000,
  day: 24 * 3600 * 1000,
  days: 24 * 3600 * 1000,
  d: 24 * 3600 * 1000,
  week: 7 * 24 * 3600 * 1000,
  weeks: 7 * 24 * 3600 * 1000,
  w: 7 * 24 * 3600 * 1000
};

function _clone(d) { return new Date(d.getTime()); }

function add(date, amount, unit) {
  const d = _clone(date);
  // Object form
  if (typeof amount === "object") {
    const o = amount;
    if (o.years || o.year) d.setFullYear(d.getFullYear() + (o.years || o.year || 0));
    if (o.months || o.month) d.setMonth(d.getMonth() + (o.months || o.month || 0));
    if (o.weeks || o.week) d.setDate(d.getDate() + 7 * (o.weeks || o.week || 0));
    if (o.days || o.day) d.setDate(d.getDate() + (o.days || o.day || 0));
    if (o.hours || o.hour) d.setHours(d.getHours() + (o.hours || o.hour || 0));
    if (o.minutes || o.minute) d.setMinutes(d.getMinutes() + (o.minutes || o.minute || 0));
    if (o.seconds || o.second) d.setSeconds(d.getSeconds() + (o.seconds || o.second || 0));
    if (o.ms || o.milliseconds) d.setMilliseconds(d.getMilliseconds() + (o.ms || o.milliseconds || 0));
    return d;
  }

  // amount number + unit
  if (typeof amount === "number" && typeof unit === "string") {
    const u = unit.toLowerCase();
    if (u === "year" || u === "years" || u === "y") {
      d.setFullYear(d.getFullYear() + amount);
      return d;
    }
    if (u === "month" || u === "months" || u === "M") {
      d.setMonth(d.getMonth() + amount);
      return d;
    }
    if (MS[u]) {
      const delta = amount * MS[u];
      d.setTime(d.getTime() + delta);
      return d;
    }
  }

  throw new Error("Invalid add() arguments");
}

function subtract(date, amount, unit) {
  // subtract is add of negative
  if (typeof amount === "object") {
    const negObj = {};
    for (const k in amount) negObj[k] = -amount[k];
    return add(date, negObj);
  }
  if (typeof amount === "number" && typeof unit === "string") {
    return add(date, -amount, unit);
  }
  throw new Error("Invalid subtract() arguments");
}

function diff(a, b, unit = "ms", asFloat = false) {
  // a.diff(b, unit)
  const ms = a.getTime() - b.getTime();
  const u = unit.toLowerCase();

  if (u === "years" || u === "year" || u === "y") {
    // compute months difference then /12
    const am = a.getFullYear() * 12 + a.getMonth();
    const bm = b.getFullYear() * 12 + b.getMonth();
    const months = am - bm;
    const years = months / 12;
    return asFloat ? years : Math.trunc(years);
  }

  if (u === "months" || u === "month" || u === "M") {
    const am = a.getFullYear() * 12 + a.getMonth();
    const bm = b.getFullYear() * 12 + b.getMonth();
    const months = am - bm;
    return asFloat ? months : Math.trunc(months);
  }

  if (u === "weeks" || u === "week" || u === "w") {
    const val = ms / MS.week;
    return asFloat ? val : Math.trunc(val);
  }

  if (MS[u]) {
    const val = ms / MS[u];
    return asFloat ? val : Math.trunc(val);
  }

  // default milliseconds
  return asFloat ? ms : Math.trunc(ms);
}

module.exports = { add, subtract, diff };
