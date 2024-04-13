// eslint-disable-next-line no-unused-vars
const ruleSet = {
  email: [
    (v) => !!v || "Šis lauks ir obligāts",
    (v) => /.+@.+\..+/.test(v) || "Lūdzu ievadiet derīgu e-pastu",
    (v) => (!!v && v.length < 256) || "Ēpastam jābūt īsākam",
  ],
  phoneNumber: [
    (v) => !!v || "Šis lauks ir obligāts",
    (v) => {
      if (v === undefined || v === null) {
        return false;
      }
      function isN(a) {
        if (/(^[0-9]+$)/.test(a) && a.length === 8) {
          return true;
        }
      }
      if (isN(v)) {
        return true;
      }
      if (v.length > 8) {
        const num = v.slice(v.length - 8, v.length);
        const reg = v.slice(0, v.length - 8);
        if (isN(num) && (reg === "+371" || reg === "+371 ")) {
          return true;
        }
      }
      return "Lūdzu ievadiet telefona numuru";
    },
  ],
  persCode: [
    (v) => !!v || "Šis lauks ir obligāts",
    (v) =>
        /(^[0-9]{6}-+[0-9]{5}$)/.test(v) || "Lūdzu ievadiet derīgu personas kodu",
  ],
  image: [
    (v) => !!v || "Šis lauks ir obligāts",
    (v) => !v || v.size < 5000000 || "Bildei nevajadzētu pārsniegt 5 MB!",
  ],
  select: [(v) => !!v || v === 0 || "Lūdzu izvēlaties vienu"],
  fileType: [
    (v) => {
      return (
          !v ||
          !v.length ||
          ["image/png", "image/jpeg", "image/jpg"].includes(v[0].type) ||
          "Lūdzu izvēlaties png vai jpeg failu"
      );
    },
  ],
};

// eslint-disable-next-line no-unused-vars
class ruleSetGen {
  static fieldManditory() {
    return (v) => !!v || "Šis lauks ir obligāts";
  }

  static persName(message) {
    return [
      this.fieldManditory(),
      (v) =>
          (v !== undefined &&
              /^[^\u0021-\u002C\u002E-\u0040\u005B-\u0060\u007B-\u007F\u2C00-\uD7FF]{2,}$/.test(
                  v,
              ) &&
              v.length < 256) ||
          message, // \u00BF-\u1FFF
    ];
  }

  static text(message, isRequired = true, minLen = 1) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) => (v && v.length >= minLen && v.length < 4096) || message,
    ];
  }

  static number(message = "Lūdzu ievadiet derīgu numuru", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) =>
          (/(^[0-9]+$)/.test(v) && v.toString().length < 256) || message,
    ];
  }

  static price(message = "Lūdzu ievadiet derīgu cenu", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) =>
          (/^\d*\.?\d*$/.test(v) && v.toString().length < 256) || message,
    ];
  }

  static phoneNumber(message = "Lūdzu ievadiet telefona numuru", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) => {
        if (!isRequired && (v === undefined || v === null)) {
          return true;
        }
        if (v.length === 0) {
          return true;
        }
        function isN(a) {
          if (/(^[0-9]+$)/.test(a) && a.length === 8) {
            return true;
          }
        }
        if (isN(v)) {
          return true;
        }
        if (v.length > 8) {
          const num = v.slice(v.length - 8, v.length);
          const reg = v.slice(0, v.length - 8);
          if (isN(num) && (reg === "+371" || reg === "+371 ")) {
            return true;
          }
        }
        return message;
      },
    ];
  }

  static persCode(message = "Lūdzu ievadiet derīgu personas kodu", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) => {
        if (!isRequired && (v === null || v === undefined)) {
          return true;
        }
      },
      (v) => {
        if (!isRequired && (v === null || v === undefined)) {
          return true;
        }
        if (/(^[0-9]{6}-+[0-9]{5}$)/.test(v) || v.length === 0) {
          return true;
        }
        return message;
      },
    ];
  }

  static date(message = "Lūdzu izvēlaties datumu") {
    return [(v) => v.length > 1 || message];
  }

  static checkedCheckbox(message = "Lūdzu atķeksējiet") {
    return [(v) => v || message];
  }
}