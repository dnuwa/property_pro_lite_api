import Router from 'express';
import signupController from '../controllers/signup';
import {
  fieldValidation,
  validateNames,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from '../middleware/authentication';

const authRouter = Router();

authRouter
  .route('/auth/signup')
  .post(fieldValidation, validateEmail, validateNames,
    validatePassword, validatePhoneNumber, signupController.signup);

module.exports = authRouter;
