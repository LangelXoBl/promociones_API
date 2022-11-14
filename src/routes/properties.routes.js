import Router from 'express';
import * as propertiesCtrl from '../controllers/properties.controller.js';

const router = Router();
router.post('/detail', propertiesCtrl.properties);
router.post('/order/floor', propertiesCtrl.orderFloor);
router.post('/propertieslist', propertiesCtrl.propertiesList);
router.post('/aplicado', propertiesCtrl.promotion);

export default router;
