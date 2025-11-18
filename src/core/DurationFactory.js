const Arithmetic = require("./Arithmetic");
const LocaleProvider = require("./LocaleProvider");

function create(a, b) {
  let ms = 0;
  let originalParts = null;
  let _locale = "en-US";

  if (typeof a === "number" && typeof b === "string") {
    const tmp = Arithmetic.add(new Date(0), a, b);
    ms = tmp.getTime();
  } else if (typeof a === "object") {
    const o = {
      years: a.years ?? a.year ?? 0,
      months: a.months ?? a.month ?? 0,
      weeks: a.weeks ?? a.week ?? 0,
      days: a.days ?? a.day ?? 0,
      hours: a.hours ?? a.hour ?? 0,
      minutes: a.minutes ?? a.minute ?? 0,
      seconds: a.seconds ?? a.second ?? 0,
      ms: a.ms ?? a.milliseconds ?? 0
    };

    originalParts = { ...o };

    const tmp = Arithmetic.add(new Date(0), o);
    ms = tmp.getTime();
  } else {
    throw new Error("Invalid duration arguments");
  }

  function locale(code) {
    _locale = code;
    return api;
  }

  function asMilliseconds() { return ms; }
  function asSeconds() { return ms / 1000; }
  function asMinutes() { return ms / 60000; }
  function asHours() { return ms / 3600000; }
  function asDays() { return ms / 86400000; }
  function asWeeks() { return ms / (86400000 * 7); }
  function asMonths() { return ms / (86400000 * 30); }
  function asYears() { return ms / (86400000 * 365); }

  function humanize(withSuffix = true) {
    const localeProvider = new LocaleProvider(_locale);
    const pack = localeProvider.getPack(_locale);
    const dict = pack.humanize;

    const abs = Math.abs(ms);
    const s = Math.round(abs / 1000);

    const isFuture = ms >= 0;

    function choose(key, value) {
      const group = withSuffix
        ? (isFuture ? dict.future : dict.past)
        : dict.none;

      if (typeof group[key] === "function") {
        return group[key](value);
      }
      return group[key];
    }

    if (s < 45) return choose("seconds");
    if (s < 90) return choose("minute");

    const m = Math.round(s / 60);
    if (m < 45) return choose("minutes", m);

    const h = Math.round(m / 60);
    if (h < 22) return choose(h === 1 ? "hour" : "hours", h);

    const d = Math.round(h / 24);
    if (d < 26) return choose(d === 1 ? "day" : "days", d);

    const mo = Math.round(d / 30);
    if (mo < 11) return choose(mo === 1 ? "month" : "months", mo);

    const y = Math.round(d / 365);
    return choose(y === 1 ? "year" : "years", y);
  }

  function format() {
    const localeProvider = new LocaleProvider(_locale);
    const pack = localeProvider.getPack(_locale);
    const units = pack.units;

    let totalMs;

    if (originalParts) {
      totalMs = Arithmetic.add(new Date(0), originalParts).getTime();
    } else {
      totalMs = ms;
    }

    let remaining = Math.abs(totalMs);
    const out = [];

    function push(val, singular, plural) {
      if (!val) return;
      const word = units[val === 1 ? singular : plural];
      out.push(`${val} ${word}`);
    }

    const y = Math.floor(remaining / (365 * 86400000));
    remaining -= y * 365 * 86400000;
    push(y, "year", "years");

    const mo = Math.floor(remaining / (30 * 86400000));
    remaining -= mo * 30 * 86400000;
    push(mo, "month", "months");

    const d = Math.floor(remaining / 86400000);
    remaining -= d * 86400000;
    push(d, "day", "days");

    const h = Math.floor(remaining / 3600000);
    remaining -= h * 3600000;
    push(h, "hour", "hours");

    const m = Math.floor(remaining / 60000);
    remaining -= m * 60000;
    push(m, "minute", "minutes");

    const s = Math.floor(remaining / 1000);
    push(s, "second", "seconds");

    return out.length ? out.join(" ") : `0 ${units.seconds}`;
  }

  const api = {
    locale,
    asMilliseconds,
    asSeconds,
    asMinutes,
    asHours,
    asDays,
    asWeeks,
    asMonths,
    asYears,
    humanize,
    format
  };

  return api;
}

module.exports = { create };
