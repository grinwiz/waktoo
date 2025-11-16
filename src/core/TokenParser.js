const map = {
  YYYY: { regex: "(\\d{4})", apply: (d, v) => d.year = +v },
  YY: { regex: "(\\d{2})", apply: (d, v) => d.year = 2000 + +v },

  MM: { regex: "(\\d{2})", apply: (d, v) => d.month = +v },
  M: { regex: "(\\d{1,2})", apply: (d, v) => d.month = +v },

  DD: { regex: "(\\d{2})", apply: (d, v) => d.date = +v },
  D: { regex: "(\\d{1,2})", apply: (d, v) => d.date = +v },

  HH: { regex: "(\\d{2})", apply: (d, v) => d.hour24 = +v },
  H: { regex: "(\\d{1,2})", apply: (d, v) => d.hour24 = +v },

  mm: { regex: "(\\d{2})", apply: (d, v) => d.minute = +v },
  m: { regex: "(\\d{1,2})", apply: (d, v) => d.minute = +v },

  ss: { regex: "(\\d{2})", apply: (d, v) => d.second = +v },
  s: { regex: "(\\d{1,2})", apply: (d, v) => d.second = +v }
};

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegex(format) {
  const tokens = Object.keys(map).sort((a, b) => b.length - a.length);

  let regexStr = "^";
  let groups = [];

  let i = 0;
  while (i < format.length) {
    let matched = false;

    for (const token of tokens) {
      if (format.startsWith(token, i)) {
        regexStr += map[token].regex;
        groups.push(token);
        i += token.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      regexStr += escapeRegex(format[i]);
      i += 1;
    }
  }

  regexStr += "$";

  return { regex: new RegExp(regexStr), groups };
}

function parse(input, format) {
  const { regex, groups } = buildRegex(format);

  const match = input.match(regex);
  if (!match) return null;

  const parts = {
    year: 1970,
    month: 1,
    date: 1,
    hour24: 0,
    minute: 0,
    second: 0
  };

  for (let i = 1; i < match.length; i++) {
    const token = groups[i - 1];
    const value = match[i];
    map[token].apply(parts, value);
  }

  return new Date(Date.UTC(
    parts.year,
    parts.month - 1,
    parts.date,
    parts.hour24,
    parts.minute,
    parts.second
  ));
}

module.exports = { parse };
