// core/TimeZoneService.js
// Default behavior: All waktoo() instances operate in UTC
// unless .tz("Region/City") is explicitly applied.

class TimeZoneService {
  getParts(date, tz) {
    // No timezone specified → return UTC parts (NEW BEHAVIOR)
    if (!tz) return this._utcParts(date);

    // Timezone specified → convert using IANA zone
    return this._tzParts(date, tz);
  }

  // --- UTC parts (DEFAULT MODE) ---
  _utcParts(d) {
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      monthIndex: d.getUTCMonth(),
      day: d.getUTCDate(),
      hour24: d.getUTCHours(),
      minute: d.getUTCMinutes(),
      second: d.getUTCSeconds(),
      weekdayIndex: d.getUTCDay()
    };
  }

  // --- Timezone-specific parts ---
  _tzParts(date, tz) {
    // Convert date → wall-clock in the specific timezone
    const localized = new Date(date.toLocaleString("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    }));

    const nums = localized.toLocaleString("en-US", {
      timeZone: tz
    }).match(/\d+/g).map(n => parseInt(n, 10));

    // US format: month, day, year, hour, minute, second
    const [month, day, year, hour, minute, second] = nums;

    // Get weekday in this timezone
    const weekdayShort = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short"
    }).format(date);

    const weekdayMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

    return {
      year,
      month,
      monthIndex: month - 1,
      day,
      hour24: hour,
      minute,
      second,
      weekdayIndex: weekdayMap[weekdayShort]
    };
  }
}

module.exports = TimeZoneService;
