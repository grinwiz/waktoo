const waktoo = require("../index");

describe("Duration: English", () => {
  it("humanize future: in 1 hour", () => {
    const d = waktoo.duration({ hour: 1 });
    expect(d.humanize()).toBe("in 1 hour");
  });

  it("humanize past: 1 hour ago", () => {
    const d = waktoo.duration({ hour: -1 });
    expect(d.humanize()).toBe("1 hour ago");
  });

  it("humanize without suffix", () => {
    const d = waktoo.duration({ hour: 2 });
    expect(d.humanize(false)).toBe("2 hours");
  });

  it("format from object", () => {
    const d = waktoo.duration({ hours: 1, minutes: 30 });
    expect(d.format()).toBe("1 hour 30 minutes");
  });

  it("numeric duration breakdown", () => {
    const d = waktoo.duration(90061, "seconds");
    expect(d.format()).toBe("1 day 1 hour 1 minute 1 second");
  });

});

describe("Duration: Indonesian", () => {
  it("humanize future: dalam 1 jam", () => {
    const d = waktoo.duration({ hour: 1 }).locale("id-ID");
    expect(d.humanize()).toBe("dalam 1 jam");
  });

  it("humanize past: 1 jam yang lalu", () => {
    const d = waktoo.duration({ hour: -1 }).locale("id-ID");
    expect(d.humanize()).toBe("1 jam yang lalu");
  });

  it("humanize without suffix: 2 jam", () => {
    const d = waktoo.duration({ hour: 2 }).locale("id-ID");
    expect(d.humanize(false)).toBe("2 jam");
  });

  it("format Indonesian", () => {
    const d = waktoo.duration({ minutes: 90 }).locale("id-ID");
    expect(d.format()).toBe("1 jam 30 menit");
  });

});
