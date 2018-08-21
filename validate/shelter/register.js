const Validator = require('validator');

const isEmpty = require('../isEmpty');

module.exports = function(data) {
  const errors = {};

  const city = data.city ? data.city : '';
  const name = data.name ? data.name : '';
  const email = data.email ? data.email: '';
  const address = data.address ? data.address : '';
  const password = data.password ? data.password : '';
  const password2 = data.password2 ? data.password2 : '';

  if(!Validator.isLength(city, {min: 2, max: 30})) {
    errors.city = 'City field must contain at lest two charachters'
  }

  if (Validator.isEmpty(city)) {
    errors.city = 'City field is required'
  }

  if (!Validator.isLength(name, {min: 2, max: 30})) {
    errors.name = 'Name field must contain at lest two charachters'
  }

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required'
  }

  if(!Validator.isEmail(email)) {
    errors.email = 'Email field is invalid'
  }

  if(Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }

  if(Validator.isEmpty(address)) {
    errors.address = 'Address field is required'
  }

  if(!Validator.isLength(address, {min: 2, max: 40})) {
    errors.address = 'Invalid address'
  }

  if (Validator.isEmpty(address)) {
    errors.address = 'Address field is required'
  }

  if (!Validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 charachters'
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password Field is required'
  }

  if(!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords do not match'
  }

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Password Field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}