import Router from 'express';

import advertController from '../controllers/adverts';
import middleware from '../middleware';
import { validateEmptyFields, validatePrice } from '../middleware/property';

const adRouter = Router();

adRouter
  .route('/property')
  .post(middleware.verifyToken, validateEmptyFields, validatePrice, advertController.createAdvert);

module.exports = adRouter;
