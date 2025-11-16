class DateParser {
  // strict: boolean
  static parse(input, strict = true, format) {
    if (format) {
      const d = TokenParser.parse(input, format);
      if (!d) throw new Error("Invalid date format for strict mode");
      return d;
    }

    if (input == null) return new Date();

    if (input instanceof Date) {
      if (isNaN(input.getTime())) throw new Error("Invalid Date object");
      return new Date(input.getTime());
    }

    if (typeof input === "number") return new Date(input);

    // allow waktoo(..., { strict: false }) to be used by callers, but default in waktoo is strict=true
    const parsed = new Date(input);

    if (strict) {
      // Basic strict checks: ISO-like or common unambiguous forms
      // Accept: YYYY-MM-DD, YYYY-MM-DDTHH:mm:ssZ, and full Date.parse valid forms that start with year
      const isoLike = /^\d{4}-\d{2}-\d{2}(\s|T|$)/;
      if (!isoLike.test(String(input)) || isNaN(parsed.getTime())) {
        throw new Error(`Strict mode: invalid date format "${input}"`);
      }
    }

    if (isNaN(parsed.getTime())) {
      throw new Error("Invalid date input: " + input);
    }

    return parsed;
  }
}

module.exports = DateParser;
