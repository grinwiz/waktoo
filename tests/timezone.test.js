const waktoo = require("../index.cjs");

describe("Timezone handling", () => {
  it("default is UTC", () => {
    expect(waktoo("2025-12-25T00:00:00Z").format("HH:mm")).toBe("00:00");
  });

  it("formats Jakarta offset", () => {
    expect(
      waktoo("2025-12-25T00:00:00Z").tz("Asia/Jakarta").format("Z")
    ).toBe("+07:00");
  });

  it("compact offset", () => {
    expect(
      waktoo("2025-12-25T00:00:00Z").tz("Asia/Jakarta").format("ZZ")
    ).toBe("+0700");
  });

  it("timezone abbreviation", () => {
    expect(
      waktoo("2025-12-25T00:00:00Z").tz("Asia/Jakarta").format("z")
    ).toBe("WIB");
  });

  it("uses timezone hour", () => {
    expect(
      waktoo("2025-12-25T00:00:00Z").tz("Asia/Jakarta").format("HH")
    ).toBe("07");
  });
});
