const enUS = require("../locales/en-US");
const idID = require("../locales/id-ID");

class LocaleProvider {
  constructor(locale) {
    this.locale = locale || "en-US";
    this.packs = {
      "en-US": enUS,
      "id-ID": idID
    };
    if (!this.packs[this.locale]) {
      throw new Error("Unsupported locale: " + this.locale);
    }
  }

  getPack() {
    return this.packs[this.locale];
  }
}

module.exports = LocaleProvider;
