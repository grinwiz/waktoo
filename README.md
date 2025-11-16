<div align="center">

# **WaktooJS**

### **UTC-First • Lightweight • Chainable Date-Time Library**

A fast, modern, dependency-free datetime engine for JavaScript —  
with strict UTC parsing, timezone support, locale formatting, durations,  
relative time, calendar outputs, and flexible formatting tokens.

#### “Time made simple. Lightweight. Predictable. Powerful.”

<br>

[![NPM Version](https://img.shields.io/npm/v/waktoo.svg?style=flat&color=blue)](https://www.npmjs.com/package/waktoo)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/size-lightweight-00cc88.svg)](#)
[![Node Support](https://img.shields.io/badge/node-`3E=16.0-brightgreen.svg)](#)

</div>

---
# Why WaktooJS?

> Ideal for applications needing reliable, predictable, and readable date manipulation without heavy dependencies.

Modern JavaScript apps need predictable and readable date operations — not massive libraries. Waktoo focuses on the essentials:

#### Fast, Lightweight, Zero Dependencies  
No overhead. No polyfills. No bloated parsing engine.

#### UTC-First (Predictable Everywhere)  
Your code runs the same on every machine — CI, server, client, container.  
No surprise timezone shifts.

#### Timezone support
Fully support timezone formatting + abbreviations & offsets

#### Modern, Clean, Chainable API  
```js
waktoo().tz("Asia/Tokyo").add(1,"day").format("DD MMM YYYY")
```

---

# Table of Contents

- [Introduction](#waktoojs)
- [Why Waktoo](#why-waktoo)
- [Installation](#installation)
- [Importing](#importing)
- [Quick Usage](#quick-usage)
- [UTC Default Behavior](#utc-default-behavior)
- [Timezone-Aware Getters](#timezone-aware-getters)
- [Date Arithmetic](#date-arithmetic)
- [Diff](#diff)
- [Duration](#duration)
- [Duration.format()](#durationformat)
- [Relative Time](#relative-time)
- [Calendar Output](#calendar-output)
- [Token-Based Date Parsing](#token-based-date-parsing)
- [Timezone Formatting](#timezone-formatting)
- [Supported Format Tokens](#supported-format-tokens)
- [Supported Timezone Abbreviations](#supported-timezone-abbreviations)
- [API Reference Index](#api-reference-index)
- [License](#license)

---

# Installation

```bash
npm install waktoo
```

---

# Importing

### CommonJS
```js
const waktoo = require("waktoo");
```

### ESM
```js
import waktoo from "waktoo";
```

---

# Quick Usage

```js
waktoo().format();
// → "2025-12-01T00:00:00.000Z"

waktoo().format("DD MMM YYYY"); 
// → "16 Nov 2025"

waktoo("2025-12-01")
  .tz("Asia/Jakarta")
  .format("DD MMM YYYY HH:mm Z");
// → "02 Des 2025 07:00 +07:00"

waktoo().locale("id-ID").format("DD MMMM YYYY");
// → "16 November 2025"

waktoo("2025-12-31").fromNow();
// → "in 1 month"
```

---

# UTC Default Behavior

Waktoo stores everything in **strict UTC**.

This means:

- `waktoo().hour()` → UTC hour  
- `waktoo().date()` → UTC date  
- `waktoo().day()` → UTC weekday  

This guarantees reproducibility across all machines.

---

# Timezone-Aware Getters

To get timezone-based values:

```js
waktoo("2025-12-01T00:00:00Z").tz("Asia/Jakarta").hour();
// → 7

waktoo("2025-12-01T00:00:00Z").tz("America/New_York").date();
// → 30 (previous day)
```

Any of these reflect the chosen timezone:

- `year()`
- `month()`
- `date()`
- `day()`
- `hour()`
- `minute()`
- `second()`

---

# Date Arithmetic

```js
waktoo("2025-01-01").add(3, "days");
waktoo("2025-01-01").add({ months: 2, hours: 5 });

waktoo("2025-01-10").subtract(1, "month");
```

---

# Diff

```js
const a = waktoo("2025-12-25");
const b = waktoo("2025-12-10");

a.diff(b, "days");       // 15
a.diff(b, "days", true); // 15.0 (float)
```

---

# Duration

```js
waktoo.duration(3, "hours").asMinutes();
// → 180

waktoo.duration({ hours: 2, minutes: 30 }).humanize();
// → "in 2 hours"
```

---

# Duration.format()

If created using an **object**, output is **deterministic**:

```js
waktoo.duration({
  years: 2,
  months: 3,
  days: 5,
  hours: 4,
  minutes: 30,
  seconds: 10
}).format();

// → "2 years 3 months 5 days 4 hours 30 minutes 10 seconds"
```

If created via numeric values:

```js
waktoo.duration(90061, "seconds").format();
// → "1 days 1 hours 1 minutes 1 seconds"
```

---

# Relative Time

```js
waktoo("2025-12-31").fromNow();
// → "in 1 month"

waktoo("2025-12-01").from("2025-11-25");
// → "in 6 days"
```

### Indonesian

```js
waktoo().add(1, "hour").locale("id-ID").fromNow();
// → "dalam 1 jam"

waktoo().subtract(2, "hours").locale("id-ID").fromNow();
// → "2 jam yang lalu"
```

---

# Calendar Output

English:

```js
waktoo("2025-12-31").calendar();
// → "Today at 15:00"
// → "Tomorrow at 11:00"
// → "Yesterday at 22:00"
// → "Sunday at 09:00"
// → "31/12/2025"
```

Indonesian:

```js
waktoo("2025-12-31").locale("id-ID").calendar();
// → "Hari ini pukul 15:00"
```

---

# Token-Based Date Parsing

Supports patterns similar to Moment:

`
waktoo("25/12/2025", "DD/MM/YYYY");
waktoo("14-05-2026 13:40", "DD-MM-YYYY HH:mm");
waktoo("2025.12.25 23:59:10", "YYYY.MM.DD HH:mm:ss");
`

Example:

```js
waktoo("25/12/2025", "DD/MM/YYYY")
  .format("YYYY-MM-DD");

// → "2025-12-25"
```

Strict mode rejects wrong formats:

```js
waktoo("99/99/9999", "DD/MM/YYYY");
// ❌ Throws invalid date error
```

---

# Timezone Formatting

Waktoo supports:

- `Z`  → "+07:00"  
- `ZZ` → "+0700"  
- `z`  → "WIB"  
- `zzz` → "WIB" (long/variant)

```js
waktoo()
  .tz("Asia/Jakarta")
  .format("DD MMM YYYY HH:mm:ss Z z");
// → "16 Nov 2025 23:00:00 +07:00 WIB"
```

---

# Supported Format Tokens

| Token | Description |
|-------|-------------|
| YYYY | 4-digit year |
| YY | 2-digit year |
| MMMM | Month long |
| MMM | Month short |
| MM | 01–12 |
| M | 1–12 |
| DD | 01–31 |
| D | 1–31 |
| dddd | Weekday long |
| ddd | Weekday short |
| HH | 00–23 |
| H | 0–23 |
| hh | 01–12 |
| h | 1–12 |
| mm | 00–59 |
| m | 0–59 |
| ss | 00–59 |
| s | 0–59 |
| A | AM/PM |
| a | am/pm |
| Z | +07:00 |
| ZZ | +0700 |
| z | timezone abbr |
| zzz | long/display TZ abbr |

---

# Supported Timezone Abbreviations

Waktoo includes an expanded global TZ abbreviation map:

| Timezone | Abbrev |
|----------|--------|
| Asia/Jakarta | WIB |
| Asia/Makassar | WITA |
| Asia/Jayapura | WIT |
| America/New_York | EST/EDT |
| America/Chicago | CST/CDT |
| America/Denver | MST/MDT |
| America/Los_Angeles | PST/PDT |
| America/Phoenix | MST |
| America/Toronto | EST |
| America/Vancouver | PST |
| America/Sao_Paulo | BRT |
| Europe/London | GMT/BST |
| Europe/Dublin | GMT/IST |
| Europe/Paris | CET/CEST |
| Europe/Berlin | CET/CEST |
| Europe/Madrid | CET/CEST |
| Europe/Rome | CET/CEST |
| Europe/Moscow | MSK |
| Africa/Johannesburg | SAST |
| Africa/Cairo | EET |
| Africa/Nairobi | EAT |
| Asia/Tokyo | JST |
| Asia/Seoul | KST |
| Asia/Shanghai | CST |
| Asia/Hong_Kong | HKT |
| Asia/Singapore | SGT |
| Asia/Kuala_Lumpur | MYT |
| Asia/Bangkok | ICT |
| Australia/Sydney | AEST/AEDT |
| Australia/Perth | AWST |
| Pacific/Auckland | NZST/NZDT |

Fallback behavior:

> If a timezone is missing an abbreviation, waktoo uses the last segment of the TZ name (e.g., "Asia/Colombo" → "Colombo").

---

# API Reference Index

### Core  
- `waktoo(input?)`  
- `waktoo().format(pattern)`  
- `waktoo().locale(localeCode)`  
- `waktoo().tz(timezone)`

### Getters  
- `year()`  
- `month()`  
- `date()`  
- `day()`  
- `hour()`  
- `minute()`  
- `second()`

### Math  
- `add(value, unit)`  
- `add({ parts })`  
- `subtract(value, unit)`  
- `subtract({ parts })`  
- `diff(otherDate, unit?, float?)`

### Relative  
- `fromNow()`  
- `from(otherWaktooInstance)`

### Calendar  
- `calendar()`

### Duration API  
- `waktoo.duration(number, unit)`  
- `waktoo.duration({ parts })`  
- `.asMilliseconds()`  
- `.asSeconds()`  
- `.asMinutes()`  
- `.asHours()`  
- `.asDays()`  
- `.format()`  
- `.humanize(locale?)`

---


# License

[MIT](LICENSE)
