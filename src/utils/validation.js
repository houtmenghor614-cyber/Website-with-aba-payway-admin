export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function isRequired(value) {
  return String(value == null ? "" : value).trim().length > 0;
}

export function minLength(value, min) {
  return String(value || "").length >= min;
}

export function isPositiveNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0;
}

export function isNumber(value) {
  const n = Number(value);
  return Number.isFinite(n);
}

/** Runs validators, returns { errors } map. */
export function validateFields(rules) {
  const errors = {};
  Object.entries(rules).forEach(([name, rule]) => {
    for (const [validate, message] of rule.validators) {
      if (!validate(rule.value)) {
        errors[name] = message;
        break;
      }
    }
  });
  return errors;
}
