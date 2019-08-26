import Router from 'express';
import fileupload from 'express-fileupload';
import advertController from '../controllers/adverts';
import searchController from '../controllers/searchAdverts';
import deleteController from '../controllers/deleteAdvert';
import updateController from '../controllers/updateAdvert';
import markAsSoldcontroller from '../controllers/soldAdvert';
import middleware from '../middleware';
import { validateEmptyFields, validatePrice, validateStatus } from '../middleware/property';

const adRouter = Router();

adRouter.use(fileupload({ useTempFiles: true }));

adRouter
  .route('/property')
  .post(middleware.verifyToken, validateEmptyFields,
    validatePrice, advertController.createAdvert);
adRouter.route('/property/type/:type').get(searchController.searchAdvert);
adRouter.route('/property').get(advertController.allAdverts);
adRouter
  .route('/property/:propertyId').get(advertController.singleAdvert)
  .delete(middleware.verifyToken, deleteController.deleteAdvert)
  .patch(middleware.verifyToken, validatePrice, updateController.updateAdvert);
adRouter
  .route('/property/:propertyId/sold')
  .patch(middleware.verifyToken, validateStatus, markAsSoldcontroller.markSold);
adRouter.route('/user/adverts').get(middleware.verifyToken, advertController.userAds);

adRouter.route('/property/paginate/:page').get(advertController.findbyOffset); 

module.exports = adRouter;
