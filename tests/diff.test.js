const waktoo = require("../index.cjs");

describe("Diff", () => {
  it("diff in days", () => {
    const a = waktoo("2025-12-25");
    const b = waktoo("2025-12-20");
    expect(a.diff(b, "days")).toBe(5);
  });

  it("diff in days float", () => {
    const a = waktoo("2025-12-25T12:00:00Z");
    const b = waktoo("2025-12-20T00:00:00Z");
    expect(a.diff(b, "days", true)).toBeCloseTo(5.5, 1);
  });

  it("diff in months", () => {
    const a = waktoo("2025-12-25");
    const b = waktoo("2025-10-25");
    expect(a.diff(b, "months")).toBe(2);
  });
});
