const TOKENS = require("./tokens");
const TZ_ABBREV = require("./tzAbbrev");

// escape regex special chars in token strings
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class Formatter {
  constructor() {
    // sort tokens by length desc so longer tokens are matched first (MMMM before MMM before MM before M)
    this.tokenList = Object.keys(TOKENS).sort((a, b) => b.length - a.length);
    // build a single regex like /(YYYY|MMMM|ddd|...)/g with tokens escaped
    const pattern = this.tokenList.map(t => escapeRegex(t)).join("|");
    this._tokenRegex = new RegExp(pattern, "g");
  }

  format(pattern, parts, localePack, tz, originalDate) {
    if (!pattern) return "";

    // main replacement using single pass
    const replaced = pattern.replace(this._tokenRegex, (match) => {
      const fn = TOKENS[match];
      if (!fn) return match; // safety
      try {
        return fn(parts, localePack);
      } catch (e) {
        return match;
      }
    });

    // if no timezone specified, return result
    if (!tz) return replaced;

    // compute offset deterministically using parts + originalDate
    const offset = this._offsetStringFromParts(parts, originalDate); // "+07:00"
    const compact = offset.replace(":", ""); // "+0700"
    const abbrev = TZ_ABBREV[tz] || (tz.split("/").pop() || tz);

    return replaced
      .split("ZZ").join(compact)
      .split("Z").join(offset)
      .split("zzz").join((abbrev || "").toUpperCase())
      .split("z").join(abbrev || "");
  }

  // compute timezone offset string from parts (the tz-adjusted components) and the original UTC instant
  _offsetStringFromParts(parts, originalDate) {
    // parts are the timezone-local wall-clock components for the same instant:
    // { year, monthIndex, day, hour24, minute, second }
    // Build a UTC timestamp that would represent that same wall-clock in UTC:
    const tzWallClockUtcMs = Date.UTC(
      parts.year,
      parts.monthIndex,
      parts.day,
      parts.hour24,
      parts.minute,
      parts.second
    );

    // originalDate is the actual instant in UTC (ms)
    const offsetMs = tzWallClockUtcMs - originalDate.getTime();
    const sign = offsetMs >= 0 ? "+" : "-";
    const totalMin = Math.abs(Math.round(offsetMs / 60000));
    const hours = Math.floor(totalMin / 60).toString().padStart(2, "0");
    const minutes = (totalMin % 60).toString().padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  }
}

module.exports = Formatter;
