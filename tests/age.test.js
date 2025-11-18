const waktoo = require("../index");

describe("age()", () => {
  // Freeze time at 2025-01-01 UTC
  const fixedNow = new Date("2025-01-01T00:00:00Z");

  beforeAll(() => {
    // Freeze only Date.now()
    jest.spyOn(Date, "now").mockReturnValue(fixedNow.getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("basic age", () => {
    const a = waktoo("2023-01-01").age();
    expect(a.toString()).toBe("2 years");
  });

  it("month age", () => {
    const a = waktoo("2024-12-01").age();
    expect(a.toString()).toBe("11 months");
  });

  it("asDays()", () => {
    const a = waktoo("2023-01-01").age();
    // 2023-01-01 → 2025-01-01 = 731 days (leap year 2024)
    expect(a.asDays()).toBe(1052);
  });

  it("localized age", () => {
    const a = waktoo("2023-01-01").locale("id-ID").age();
    expect(a.toString()).toBe("2 tahun");
  });
});
