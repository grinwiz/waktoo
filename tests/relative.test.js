const waktoo = require("../index.cjs");

describe("Relative time", () => {
  it("fromNow future", () => {
    expect(waktoo().add(2, "days").fromNow()).toContain("in 2 days");
  });

  it("fromNow past", () => {
    expect(waktoo().subtract(1, "hour").fromNow()).toContain("hour ago");
  });

  it("from another date", () => {
    expect(waktoo("2025-12-31").from("2025-12-25")).toContain("6 days");
  });
});
