const waktoo = require("../index.cjs");
const idLocale = require("../src/locales/id-ID").humanize;

describe("Duration", () => {
  it("asMinutes", () => {
    expect(waktoo.duration(2, "hours").asMinutes()).toBe(120);
  });

  it("asHours composite", () => {
    expect(waktoo.duration({ hours: 1, minutes: 30 }).asHours()).toBe(1.5);
  });

  it("humanize future: in 1 hour", () => {
    const d = waktoo.duration({ hour: 1 });
    expect(d.humanize()).toBe("in 1 hour");
  });

  it("humanize future: in 2 hours", () => {
    const d = waktoo.duration({ hours: 2 });
    expect(d.humanize()).toBe("in 2 hours");
  });

  it("humanize past: 1 hour ago", () => {
    const d = waktoo.duration({ hour: -1 });
    expect(d.humanize()).toBe("1 hour ago");
  });

  it("humanize past: 2 hours ago", () => {
    const d = waktoo.duration({ hours: -2 });
    expect(d.humanize()).toBe("2 hours ago");
  });

  it("humanize Indonesian: dalam 1 jam", () => {
    const d = waktoo.duration({ hour: 1 });
    expect(d.humanize(false, { humanize: idLocale })).toBe("dalam 1 jam");
  });

  it("humanize Indonesian: 1 jam yang lalu", () => {
    const d = waktoo.duration({ hour: -1 });
    expect(d.humanize(false, { humanize: idLocale })).toBe("1 jam yang lalu");
  });

  it("format exact provided parts", () => {
    const d = waktoo.duration({
      years: 2,
      months: 3,
      days: 5,
      hours: 4,
      minutes: 30,
      seconds: 10
    });

    expect(d.format()).toBe(
      "2 years 3 months 5 days 4 hours 30 minutes 10 seconds"
    );
  });

  it("format numeric duration breakdown", () => {
    const totalMs =
      1 * 24 * 3600 * 1000 +
      2 * 3600 * 1000 +
      3 * 60 * 1000 +
      4 * 1000;

    const d = waktoo.duration(totalMs / 1000, "seconds");
    expect(d.format()).toBe("1 days 2 hours 3 minutes 4 seconds");
  });

  it("format zero duration", () => {
    expect(waktoo.duration(0, "seconds").format()).toBe("0 seconds");
  });
});
