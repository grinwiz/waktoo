const waktoo = require("../index");

describe("range()", () => {
  it("detailed range", () => {
    const r = waktoo("2023-01-01").range("2025-03-05");
    expect(r).toBe("2 years 2 months 4 days");
  });

  it("unit=day exact ms", () => {
    const r = waktoo("2023-01-01").range("2023-01-03", "minute");
    expect(r).toBe("2880 minutes");
  });

  it("unit=year", () => {
    const r = waktoo("2023-01-01").range("2025-01-01", "year");
    expect(r).toBe("2 years");
  });

  it("localized", () => {
    const r = waktoo("2023-01-01").locale("id-ID").range("2025-01-01");
    expect(r).toBe("2 tahun");
  });
});
