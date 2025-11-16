const waktoo = require("../index.cjs");

describe("Getters (UTC)", () => {
  const t = waktoo("2025-12-31T15:45:30Z");

  it("year()", () => expect(t.year()).toBe(2025));
  it("month()", () => expect(t.month()).toBe(11));
  it("date()", () => expect(t.date()).toBe(31));
  it("day()", () => expect(t.day()).toBe(3));
  it("hour()", () => expect(t.hour()).toBe(15));
  it("minute()", () => expect(t.minute()).toBe(45));
  it("second()", () => expect(t.second()).toBe(30));
});
