import Router from 'express';
import advertController from '../controllers/adverts';
import searchController from '../controllers/searchAdverts';
import middleware from '../middleware';
import { validateEmptyFields, validatePrice } from '../middleware/property';

const adRouter = Router();

adRouter
  .route('/property')
  .post(middleware.verifyToken, validateEmptyFields,
    validatePrice, advertController.createAdvert);
adRouter.route('/property/type/:type').get(searchController.searchAdvert);

module.exports = adRouter;