const DateParser = require('./core/DateParser');
const LocaleProvider = require('./core/LocaleProvider');
const TimeZoneService = require('./core/TimeZoneService');
const Formatter = require('./core/Formatter');
const Arithmetic = require('./core/Arithmetic');
const DurationFactory = require('./core/DurationFactory');
const RelativeCalendar = require('./core/RelativeCalendar');

class Waktoo {
  constructor(dateInput = null, config = {}) {
    // strict ON by default
    const strict = config.strict === undefined ? true : !!config.strict;
    this._raw = DateParser.parse(dateInput, strict);

    this._locale = config.locale || "en-US";
    this._tz = config.tz || null;
    this._strict = strict;

    // services (dependencies)
    this._localeProvider = new LocaleProvider(this._locale);
    this._tzService = new TimeZoneService();
    this._formatter = new Formatter();

    this._raw = DateParser.parse(dateInput, strict, config.format || null);
  }

  // immutable clone with changes
  _clone(changes = {}) {
    const cfg = {
      strict: this._strict,
      locale: this._locale,
      tz: this._tz,
      ...changes
    };
    const inst = new Waktoo(this._raw, cfg);
    // copy the raw but if changes.raw provided, use it
    if (changes.raw instanceof Date) inst._raw = new Date(changes.raw.getTime());
    return inst;
  }

  // -------- chaining mutators (return new instance) --------
  tz(tzName) {
    return this._clone({ tz: tzName });
  }

  locale(loc) {
    return this._clone({ locale: loc });
  }

  strict(flag = true) {
    return this._clone({ strict: !!flag });
  }

  // -------- moment-like getters (use timezone effects) --------
  _parts() {
    return this._tzService.getParts(this._raw, this._tz);
  }

  year(val) {
    if (val === undefined) return this._parts().year;
    // set year -> return new instance
    const d = new Date(this._raw.getTime());
    d.setFullYear(val);
    return this._clone({ raw: d });
  }

  month(val) {
    // getter returns 0-11 to match moment? Moment's .month() returns 0-11.
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
    // moment's day() returns day of week (0 - Sunday)
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

  // -------- toDate / toISOString / valueOf --------
  toDate() {
    return new Date(this._raw.getTime());
  }

  toISOString() {
    return this._raw.toISOString();
  }

  valueOf() {
    return this._raw.getTime();
  }

  // -------- formatting (format returns string directly) --------
  format(pattern = null) {
    if (!pattern) return this._raw;

    const parts = this._tzService.getParts(this._raw, this._tz);
    const loc = this._localeProvider.getPack();
    return this._formatter.format(pattern, parts, loc, this._tz, this._raw);
  }

  // -------- arithmetic (add/subtract) --------
  add(amount, unit) {
    const newDate = Arithmetic.add(this._raw, amount, unit);
    return this._clone({ raw: newDate });
  }

  subtract(amount, unit) {
    const newDate = Arithmetic.subtract(this._raw, amount, unit);
    return this._clone({ raw: newDate });
  }

  // diff: other can be Waktoo or date-like
  diff(other = Date.now(), unit = "ms", asFloat = false) {
    const otherDate = other && typeof other === "object" && other._raw instanceof Date ? other._raw : DateParser.parse(other, false);
    return Arithmetic.diff(this._raw, otherDate, unit, asFloat);
  }

  // -------- durations (factory) --------
  static duration(a, b) {
    return DurationFactory.create(a, b);
  }

  // -------- relative time --------
  fromNow(withSuffix = true) {
    const now = new Waktoo();
    return RelativeCalendar.from(this, now, this._localeProvider.getPack(), withSuffix);
  }

  from(other, withSuffix = true) {
    const otherInst = other && other._raw instanceof Date ? other : new Waktoo(other);
    return RelativeCalendar.from(this, otherInst, this._localeProvider.getPack(), withSuffix);
  }

  // full calendar (like moment.calendar())
  calendar(reference = new Waktoo()) {
    const refInst = reference && reference._raw instanceof Date ? reference : new Waktoo(reference);
    return RelativeCalendar.calendar(this, refInst, this._localeProvider.getPack());
  }
}

// default export function
function waktoo(dateInput, config) {
  return new Waktoo(dateInput, config || {});
}

// expose Duration factory convenience
waktoo.duration = DurationFactory.create;

// expose constructor class if needed
waktoo.Waktoo = Waktoo;

module.exports = waktoo;
