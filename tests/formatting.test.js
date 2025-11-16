const waktoo = require("../index.cjs");

describe("Formatting (UTC mode)", () => {
  it("formats DD MMM YYYY", () => {
    expect(waktoo("2025-12-25").format("DD MMM YYYY")).toBe("25 Dec 2025");
  });

  it("formats lowercase am/pm", () => {
    expect(waktoo("2025-12-25T01:05:00Z").format("hh:mm a")).toBe("01:05 am");
  });

  it("formats weekday UTC", () => {
    expect(waktoo("2025-12-31T00:00:00Z").format("dddd")).toBe("Wednesday");
  });

  it("formats full month name", () => {
    expect(waktoo("2025-05-10T00:00:00Z").format("MMMM")).toBe("May");
  });

  it("formats AM/PM", () => {
    expect(waktoo("2025-12-25T23:15:00Z").format("hh:mm A")).toBe("11:15 PM");
  });
});
