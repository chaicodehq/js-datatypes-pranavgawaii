export function validateForm(formData) {
  const errors = {};

  if (!formData.name || typeof formData.name !== 'string' ||
    formData.name.trim().length < 2 || formData.name.length > 50) {
    errors.name = "Name must be 2-50 characters";
  }

  const email = formData.email;
  if (typeof email !== 'string' ||
    email.indexOf('@') === -1 ||
    email.indexOf('@') !== email.lastIndexOf('@') ||
    email.lastIndexOf('.') < email.indexOf('@') + 2) {
    errors.email = "Invalid email format";
  }

  const phone = formData.phone;
  if (typeof phone !== 'string' || phone.length !== 10 ||
    !/^[6-9]\d{9}$/.test(phone)) {
    errors.phone = "Invalid Indian phone number";
  }

  let age = formData.age;
  if (typeof age === 'string') age = parseInt(age, 10);
  if (typeof age !== 'number' || isNaN(age) || !Number.isInteger(age) || age < 16 || age > 100) {
    errors.age = "Age must be an integer between 16 and 100";
  }

  if (typeof formData.pincode !== 'string' || formData.pincode.length !== 6 ||
    formData.pincode.startsWith('0') || !/^\d+$/.test(formData.pincode)) {
    errors.pincode = "Invalid Indian pincode";
  }

  const state = formData.state?.trim() ?? "";
  if (state === "") {
    errors.state = "State is required";
  }

  if (!formData.agreeTerms) {
    errors.agreeTerms = "Must agree to terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
