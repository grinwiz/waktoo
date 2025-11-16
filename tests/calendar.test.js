const waktoo = require("../index.cjs");

describe("Calendar output", () => {
  it("Today", () => {
    expect(waktoo().calendar().startsWith("Today at")).toBe(true);
  });

  it("Tomorrow", () => {
    expect(waktoo().add(1, "day").calendar().startsWith("Tomorrow at")).toBe(true);
  });

  it("Yesterday", () => {
    expect(waktoo().subtract(1, "day").calendar().startsWith("Yesterday at")).toBe(true);
  });

  it("Next week", () => {
    expect(waktoo().add(3, "days").calendar()).toContain("at");
  });

  it("Fallback full date", () => {
    expect(waktoo().add(20, "days").calendar()).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});
