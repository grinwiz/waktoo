const DateParser = require('./core/DateParser');
const LocaleProvider = require('./core/LocaleProvider');
const TimeZoneService = require('./core/TimeZoneService');
const Formatter = require('./core/Formatter');
const Arithmetic = require('./core/Arithmetic');
const DurationFactory = require('./core/DurationFactory');
const RelativeCalendar = require('./core/RelativeCalendar');

const {
  diffCalendar,
  calendarUnitCount,
  formatDetailed,
  formatSingleUnit
} = require('./core/Range');

const { AgeResult, humanizeAge } = require('./core/Age');

class Waktoo {
  constructor(dateInput = null, config = {}) {
    const strict = config.strict === undefined ? true : !!config.strict;
    this._locale = config.locale || "en-US";
    this._tz = config.tz || null;
    this._strict = strict;

    this._localeProvider = new LocaleProvider(this._locale);
    this._tzService = new TimeZoneService();
    this._formatter = new Formatter();

    this._raw = DateParser.parse(dateInput, strict, config.format || null);
  }

  _clone(changes = {}) {
    const cfg = {
      strict: this._strict,
      locale: this._locale,
      tz: this._tz,
      ...changes
    };
    const inst = new Waktoo(this._raw, cfg);
    if (changes.raw instanceof Date) {
      inst._raw = new Date(changes.raw.getTime());
    }
    return inst;
  }

  // ------------ chaining mutators ------------
  tz(tzName) {
    return this._clone({ tz: tzName });
  }

  locale(loc) {
    return this._clone({ locale: loc });
  }

  strict(flag = true) {
    return this._clone({ strict: !!flag });
  }

  // ------------ getters (timezone-aware) ------------
  _parts() {
    return this._tzService.getParts(this._raw, this._tz);
  }

  year(val) {
    if (val === undefined) return this._parts().year;
    const d = new Date(this._raw.getTime());
    d.setFullYear(val);
    return this._clone({ raw: d });
  }

  month(val) {
    if (val === undefined) return this._parts().monthIndex;
    const d = new Date(this._raw.getTime());
    d.setMonth(val);
    return this._clone({ raw: d });
  }

  date(val) {
    if (val === undefined) return this._parts().day;
    const d = new Date(this._raw.getTime());
    d.setDate(val);
    return this._clone({ raw: d });
  }

  day() {
    return this._parts().weekdayIndex;
  }

  hour(val) {
    if (val === undefined) return this._parts().hour24;
    const d = new Date(this._raw.getTime());
    d.setHours(val);
    return this._clone({ raw: d });
  }

  minute(val) {
    if (val === undefined) return this._parts().minute;
    const d = new Date(this._raw.getTime());
    d.setMinutes(val);
    return this._clone({ raw: d });
  }

  second(val) {
    if (val === undefined) return this._parts().second;
    const d = new Date(this._raw.getTime());
    d.setSeconds(val);
    return this._clone({ raw: d });
  }

  // ------------ conversions ------------
  toDate() {
    return new Date(this._raw.getTime());
  }

  toISOString() {
    return this._raw.toISOString();
  }

  valueOf() {
    return this._raw.getTime();
  }

  // ------------ formatting ------------
  format(pattern = null) {
    if (!pattern) return this._raw;
    const parts = this._tzService.getParts(this._raw, this._tz);
    const loc = this._localeProvider.getPack();
    return this._formatter.format(pattern, parts, loc, this._tz, this._raw);
  }

  // ------------ arithmetic ------------
  add(amount, unit) {
    const newDate = Arithmetic.add(this._raw, amount, unit);
    return this._clone({ raw: newDate });
  }

  subtract(amount, unit) {
    const newDate = Arithmetic.subtract(this._raw, amount, unit);
    return this._clone({ raw: newDate });
  }

  diff(other = Date.now(), unit = "ms", asFloat = false) {
    const otherDate =
      other && typeof other === "object" && other._raw instanceof Date
        ? other._raw
        : DateParser.parse(other, false);

    return Arithmetic.diff(this._raw, otherDate, unit, asFloat);
  }

  // ------------ durations ------------
  static duration(a, b) {
    return DurationFactory.create(a, b);
  }

  // ------------ relative ------------
  fromNow(withSuffix = true) {
    const now = new Waktoo();
    return RelativeCalendar.from(this, now, this._localeProvider.getPack(), withSuffix);
  }

  from(other, withSuffix = true) {
    const otherInst = other && other._raw instanceof Date ? other : new Waktoo(other);
    return RelativeCalendar.from(this, otherInst, this._localeProvider.getPack(), withSuffix);
  }

  calendar(reference = new Waktoo()) {
    const refInst = reference && reference._raw instanceof Date ? reference : new Waktoo(reference);
    return RelativeCalendar.calendar(this, refInst, this._localeProvider.getPack());
  }

  // ------------ NEW: range() ------------
  range(date2, unit) {
    const other = date2 instanceof Waktoo ? date2._raw : new Date(date2);
    const start = this._raw < other ? this._raw : other;
    const end   = this._raw < other ? other : this._raw;

    const localePack = this._localeProvider.getPack(this._locale);

    // unit-based output
    if (unit) {
      const u = unit.toLowerCase();

      // ms-based units
      if (["second","minute","hour","day","week"].includes(u)) {
        const msTable = {
          second: 1000,
          minute: 60000,
          hour:   3600000,
          day:    86400000,
          week:   604800000
        };
        const diff = Math.floor(Math.abs(end - start) / msTable[u]);
        return formatSingleUnit(diff, u, localePack);
      }

      // calendar units (month/year)
      if (["month","year"].includes(u)) {
        const count = calendarUnitCount(start, end, this._tzService, this._tz, u);
        return formatSingleUnit(count, u, localePack);
      }
    }

    // detailed breakdown
    const parts = diffCalendar(start, end, this._tzService, this._tz);
    return formatDetailed(parts, localePack);
  }

  // ------------ NEW: age() ------------
  age() {
    const now = new Date();

    const start = this._raw < now ? this._raw : now;
    const end   = this._raw < now ? now : this._raw;

    const parts = diffCalendar(start, end, this._tzService, this._tz);
    const localePack = this._localeProvider.getPack(this._locale);

    const value = humanizeAge(parts, localePack);
    return new AgeResult(value, this._raw, now, this._tzService, this._tz);
  }
}

// default export function
function waktoo(dateInput, config) {
  return new Waktoo(dateInput, config || {});
}

waktoo.duration = DurationFactory.create;
waktoo.Waktoo = Waktoo;

module.exports = waktoo;
