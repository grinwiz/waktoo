const waktoo = require("../index.cjs");

describe("Humanize (English)", () => {
  it("1 minute ago", () => {
    expect(waktoo().subtract(1, "minute").fromNow()).toBe("1 minute ago");
  });

  it("2 minutes ago", () => {
    expect(waktoo().subtract(2, "minutes").fromNow()).toBe("2 minutes ago");
  });

  it("1 hour ago", () => {
    expect(waktoo().subtract(1, "hour").fromNow()).toBe("1 hour ago");
  });

  it("2 hours ago", () => {
    expect(waktoo().subtract(2, "hours").fromNow()).toBe("2 hours ago");
  });

  it("in 1 hour", () => {
    expect(waktoo().add(1, "hour").fromNow()).toBe("in 1 hour");
  });

  it("in 2 hours", () => {
    expect(waktoo().add(2, "hours").fromNow()).toBe("in 2 hours");
  });
});

describe("Humanize (Indonesian)", () => {
  it("1 menit yang lalu", () => {
    expect(
      waktoo().subtract(1, "minute").locale("id-ID").fromNow()
    ).toBe("1 menit yang lalu");
  });

  it("2 menit yang lalu", () => {
    expect(
      waktoo().subtract(2, "minutes").locale("id-ID").fromNow()
    ).toBe("2 menit yang lalu");
  });

  it("1 jam yang lalu", () => {
    expect(
      waktoo().subtract(1, "hour").locale("id-ID").fromNow()
    ).toBe("1 jam yang lalu");
  });

  it("2 jam yang lalu", () => {
    expect(
      waktoo().subtract(2, "hours").locale("id-ID").fromNow()
    ).toBe("2 jam yang lalu");
  });

  it("dalam 1 jam", () => {
    expect(
      waktoo().add(1, "hour").locale("id-ID").fromNow()
    ).toBe("dalam 1 jam");
  });

  it("dalam 2 jam", () => {
    expect(
      waktoo().add(2, "hours").locale("id-ID").fromNow()
    ).toBe("dalam 2 jam");
  });
});
