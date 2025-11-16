const waktoo = require("../index.cjs");

describe("Arithmetic", () => {
  it("adds days", () => {
    expect(waktoo("2025-01-01").add(3, "days").date()).toBe(4);
  });

  it("subtracts months", () => {
    expect(waktoo("2025-03-15").subtract(1, "month").month()).toBe(1);
  });

  it("add using object form", () => {
    const res = waktoo("2025-01-01").add({ months: 1, days: 2 });
    expect(res.month()).toBe(1);
    expect(res.date()).toBe(3);
  });
});
