// File: validateSignup.js

const validateSignup = (signup) => {
  let errors = {};

  // Name validation
  if (!signup.name_input) {
    console.log("signup.name", signup);
    errors.name_input = "Name is required";
  }

  // Email validation
  if (!signup.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(signup.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!signup.password) {
    errors.password = "Password is required";
  }

  if (!signup.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  }

  // Confirm Password validation
  if (signup.password !== signup.confirmPassword) {
    console.log("signup.password", signup.password);
    console.log("signup.confirmPassword", signup.confirmPassword);
    errors.confirmPassword = "Passwords do not match";
  }

  // Phone validation
  if (!signup.phone) {
    errors.phone = "Phone is required";
  } else if (!/^[6789]\d{9}$/.test(signup.phone)) {
    errors.phone = "Phone number is invalid";
  }

  return errors;
};

export default validateSignup;
