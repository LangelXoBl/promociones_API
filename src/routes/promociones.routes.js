import { Router } from 'express';
import * as promoCtrl from '../controllers/promociones.controller.js';
import { promoValidate } from '../validators/promo.validator.js';

const router = Router();

router.post('/show/all', promoCtrl.allPromotion);

router.post('/show/one', promoCtrl.onePromotion);

router.post('/new', promoValidate, promoCtrl.createPromotion);

router.post('/edit', promoValidate, promoCtrl.editPromotion);

router.post('/delete', promoCtrl.deletePromotion);

export default router;
