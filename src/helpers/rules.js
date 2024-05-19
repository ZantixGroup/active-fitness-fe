// eslint-disable-next-line no-unused-vars
const ruleSet = {
  email: [
    (v) => !!v || "Field is required",
    (v) => /.+@.+\..+/.test(v) || "Please enter correct email",
    (v) => (!!v && v.length < 256) || "Email is too long",
  ],
  phoneNumber: [
    (v) => !!v || "Field is required",
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
      return "Please enter phone number";
    },
  ],
  persCode: [
    (v) => !!v || "Field is required",
    (v) =>
        /(^[0-9]{6}-+[0-9]{5}$)/.test(v) || "Please enter valid personal code",
  ],
  image: [
    (v) => !!v || "Field is required",
    (v) => !v || v.size < 5000000 || "Image can't exceed 5 MB!",
  ],
  select: [(v) => !!v || v === 0 || "Please select one"],
  fileType: [
    (v) => {
      return (
          !v ||
          !v.length ||
          ["image/png", "image/jpeg", "image/jpg"].includes(v[0].type) ||
          "Upload .png or .jpeg file"
      );
    },
  ],
};

// eslint-disable-next-line no-unused-vars
class ruleSetGen {
  static fieldManditory() {
    return (v) => !!v || "Field is required";
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

  static number(message = "Please enter valid number", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) =>
          (/(^[0-9]+$)/.test(v) && v.toString().length < 256) || message,
    ];
  }

  static price(message = "Please enter valid price", isRequired = true) {
    return [
      isRequired ? this.fieldManditory() : true,
      (v) =>
          (/^\d*\.?\d*$/.test(v) && v.toString().length < 256) || message,
    ];
  }

  static phoneNumber(message = "Please enter phone number", isRequired = true) {
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

  static persCode(message = "Please enter valid personal code", isRequired = true) {
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

  static date(message = "Please select a date") {
    return [(v) => v.length > 1 || message];
  }

  static checkedCheckbox(message = "Please check") {
    return [(v) => v || message];
  }
}

export { ruleSet, ruleSetGen }

