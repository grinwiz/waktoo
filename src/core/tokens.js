module.exports = {
  YYYY: p => String(p.year),
  YY: p => String(p.year).slice(-2),

  MMMM: (p, loc) => loc.monthsLong[p.monthIndex],
  MMM: (p, loc) => loc.monthsShort[p.monthIndex],
  MM: p => String(p.month).padStart(2, "0"),
  M: p => String(p.month),

  DD: p => String(p.day).padStart(2, "0"),
  D: p => String(p.day),

  dddd: (p, loc) => loc.daysLong[p.weekdayIndex],
  ddd: (p, loc) => loc.daysShort[p.weekdayIndex],

  HH: p => String(p.hour24).padStart(2, "0"),
  H: p => String(p.hour24),

  hh: p => {
    let h = p.hour24 % 12;
    return String(h === 0 ? 12 : h).padStart(2, "0");
  },

  h: p => {
    let h = p.hour24 % 12;
    return String(h === 0 ? 12 : h);
  },

  mm: p => String(p.minute).padStart(2, "0"),
  m: p => String(p.minute),

  ss: p => String(p.second).padStart(2, "0"),
  s: p => String(p.second),

  A: (p, loc) => (p.hour24 >= 12 ? loc.PM : loc.AM),
  a: (p, loc) => (p.hour24 >= 12 ? loc.PM.toLowerCase() : loc.AM.toLowerCase())
};
