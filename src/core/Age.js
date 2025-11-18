class AgeResult {
  constructor(value, start, now, tzService, tz) {
    this.value = value; // humanized string
    this._start = start;
    this._now = now;
    this._tzService = tzService;
    this._tz = tz;
  }

  toString() {
    return this.value;
  }

  _ms() {
    return Math.abs(this._now - this._start);
  }

  asSeconds() { return Math.floor(this._ms() / 1000); }
  asMinutes() { return Math.floor(this._ms() / (1000 * 60)); }
  asHours() { return Math.floor(this._ms() / (1000 * 60 * 60)); }
  asDays() { return Math.floor(this._ms() / (1000 * 60 * 60 * 24)); }
  asWeeks() { return Math.floor(this._ms() / (1000 * 60 * 60 * 24 * 7)); }

  // calendar-based
  asMonths() {
    const start = this._start;
    const end = this._now;
    let count = 0;
    let cur = start;

    while (true) {
      const next = new Date(cur.getTime());
      next.setUTCMonth(next.getUTCMonth() + 1);
      if (next <= end) {
        count++;
        cur = next;
      } else break;
    }
    return count;
  }

  asYears() {
    const start = this._start;
    const end = this._now;
    let count = 0;
    let cur = start;

    while (true) {
      const next = new Date(cur.getTime());
      next.setUTCFullYear(next.getUTCFullYear() + 1);
      if (next <= end) {
        count++;
        cur = next;
      } else break;
    }
    return count;
  }
}

function humanizeAge(parts, localePack) {
  if (parts.years > 0)
    return `${parts.years} ${localePack.units[parts.years > 1 ? "years" : "year"]}`;
  if (parts.months > 0)
    return `${parts.months} ${localePack.units[parts.months > 1 ? "months" : "month"]}`;
  if (parts.days > 0)
    return `${parts.days} ${localePack.units[parts.days > 1 ? "days" : "day"]}`;
  if (parts.hours > 0)
    return `${parts.hours} ${localePack.units[parts.hours > 1 ? "hours" : "hour"]}`;
  if (parts.minutes > 0)
    return `${parts.minutes} ${localePack.units[parts.minutes > 1 ? "minutes" : "minute"]}`;
  return `${parts.seconds} ${localePack.units[parts.seconds > 1 ? "seconds" : "second"]}`;
}

module.exports = {
  AgeResult,
  humanizeAge
};
