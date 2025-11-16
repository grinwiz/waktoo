const Arithmetic = require("./Arithmetic");

function create(a, b) {
  let ms = 0;
  let originalParts = null;

  //
  // INPUT: numeric + unit → compute ms
  //
  if (typeof a === "number" && typeof b === "string") {
    const tmp = Arithmetic.add(new Date(0), a, b);
    ms = tmp.getTime();
  }

  //
  // INPUT: object → preserve exact fields & compute ms
  //
  else if (typeof a === "object") {
    const o = {
      years: a.years || a.year || 0,
      months: a.months || a.month || 0,
      weeks: a.weeks || a.week || 0,
      days: a.days || a.day || 0,
      hours: a.hours || a.hour || 0,
      minutes: a.minutes || a.minute || 0,
      seconds: a.seconds || a.second || 0,
      ms: a.ms || a.milliseconds || 0
    };

    originalParts = { ...o };

    const tmp = Arithmetic.add(new Date(0), o);
    ms = tmp.getTime();
  }

  else {
    throw new Error("Invalid duration arguments");
  }

  //
  // Helpers
  //
  function asMilliseconds() { return ms; }
  function asSeconds() { return ms / 1000; }
  function asMinutes() { return ms / (60 * 1000); }
  function asHours() { return ms / (3600 * 1000); }
  function asDays() { return ms / (24 * 3600 * 1000); }

  //
  // HUMANIZE
  //
  function humanize(withSuffix = false, localePack) {
    const abs = Math.abs(ms);
    const s = Math.round(abs / 1000);
    const isFuture = ms >= 0;

    // Fallback English dictionary (used if localePack missing)
    const fallback = {
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
      }
    };

    const dictRoot = localePack && localePack.humanize ? localePack.humanize : fallback;
    const dict = isFuture ? dictRoot.future : dictRoot.past;

    //
    // Granularity tree
    //
    if (s < 45) return dict.seconds;
    if (s < 90) return dict.minute;

    const m = Math.round(s / 60);
    if (m < 45) return dict.minutes(m);

    const h = Math.round(m / 60);
    if (h < 22) {
      if (h === 1) return dict.hour;   // singular fix
      return dict.hours(h);
    }

    const d = Math.round(h / 24);
    if (d === 1) return dict.day;
    if (d < 26) return dict.days(d);

    const mo = Math.round(d / 30);
    if (mo === 1) return dict.month;
    if (mo < 11) return dict.months(mo);

    const y = Math.round(d / 365);
    if (y === 1) return dict.year;
    return dict.years(y);
  }

  //
  // FORMAT (deterministic)
  //
  function format() {
    //
    // CASE A: object input → use original parts exactly
    //
    if (originalParts) {
      const p = originalParts;
      const out = [];

      if (p.years) out.push(`${p.years} years`);
      if (p.months) out.push(`${p.months} months`);
      if (p.weeks) out.push(`${p.weeks} weeks`);
      if (p.days) out.push(`${p.days} days`);
      if (p.hours) out.push(`${p.hours} hours`);
      if (p.minutes) out.push(`${p.minutes} minutes`);
      if (p.seconds) out.push(`${p.seconds} seconds`);
      if (p.ms) out.push(`${p.ms} ms`);

      return out.length ? out.join(" ") : "0 seconds";
    }

    //
    // CASE B: numeric input → breakdown using ms
    //
    let remaining = Math.abs(ms);
    const out = [];

    const y = Math.floor(remaining / (365 * 24 * 3600 * 1000));
    remaining -= y * 365 * 24 * 3600 * 1000;
    if (y) out.push(`${y} years`);

    const mo = Math.floor(remaining / (30 * 24 * 3600 * 1000));
    remaining -= mo * 30 * 24 * 3600 * 1000;
    if (mo) out.push(`${mo} months`);

    const d = Math.floor(remaining / (24 * 3600 * 1000));
    remaining -= d * 24 * 3600 * 1000;
    if (d) out.push(`${d} days`);

    const h = Math.floor(remaining / (3600 * 1000));
    remaining -= h * 3600 * 1000;
    if (h) out.push(`${h} hours`);

    const m = Math.floor(remaining / (60 * 1000));
    remaining -= m * 60 * 1000;
    if (m) out.push(`${m} minutes`);

    const s = Math.floor(remaining / 1000);
    if (s) out.push(`${s} seconds`);

    return out.length ? out.join(" ") : "0 seconds";
  }

  return {
    asMilliseconds,
    asSeconds,
    asMinutes,
    asHours,
    asDays,
    humanize,
    format
  };
}

module.exports = { create };
