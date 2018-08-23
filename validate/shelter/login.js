const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = data => {
  const {email, password} = data;

  const errors = {}

  const validateEmail = email ? email : '';
  const validatePassword = password ? password : '';

  if (!Validator.isEmail(validateEmail)) {
    errors.email = 'Please enter valid email';
  }

  if (Validator.isEmpty(validateEmail)) {
    errors.email = 'Email field is required'
  }

  if(Validator.isEmpty(validatePassword)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}