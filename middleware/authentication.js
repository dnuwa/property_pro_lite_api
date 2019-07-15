/* eslint-disable consistent-return */
export function fieldValidation(req, res, next) {
  const {
    email, password, lastName, firstName, phoneNumber,
  } = req.body;
  if (!email || !password || !lastName || !firstName || !phoneNumber) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Email, Password, firstName, lastName and phoneNumber are required !',
    });
  }
  next();
}

export function validateNames(req, res, next) {
  const { lastName, firstName } = req.body;
  if (!lastName.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) || !firstName.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/)) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Names should not contain special characters',
    });
  }
  next();
}

export function validateEmail(req, res, next) {
  // Validate email
  const { email } = req.body;
  if (!email.match(/^[A-Za-z0-9.+_-]+@[A-Za-z0-9._-]+\.[a-zA-Z]{2,}$/)) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Invalid email format ',
    });
  }
  next();
}

export function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Weak password, must be at least 8 characters and have at least 1 letter and number',
    });
  }
  next();
}

export function validatePhoneNumber(req, res, next) {
  const { phoneNumber } = req.body;
  if (!phoneNumber.match(/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{9})$/)) {
    return res.status(400).json({
      status: 400,
      message: 'bad request',
      error: 'Please enter a valid phone number with country code',
    });
  }
  next();
}
