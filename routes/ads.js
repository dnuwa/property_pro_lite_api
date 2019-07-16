import Router from 'express';
import advertController from '../controllers/adverts';
import searchController from '../controllers/searchAdverts';
import deleteController from '../controllers/deleteAdvert';
import middleware from '../middleware';
import { validateEmptyFields, validatePrice } from '../middleware/property';

const adRouter = Router();

adRouter
  .route('/property')
  .post(middleware.verifyToken, validateEmptyFields,
    validatePrice, advertController.createAdvert);
adRouter.route('/property/type/:type').get(searchController.searchAdvert);
adRouter.route('/property').get(advertController.allAdverts);
adRouter
  .route('/property/:propertyId').get(advertController.singleAdvert)
  .delete(middleware.verifyToken, deleteController.deleteAdvert);

module.exports = adRouter;
