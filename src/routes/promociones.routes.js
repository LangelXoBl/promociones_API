import { Router } from "express";
import * as promoCtrl from "../controllers/promociones.controller.js";
import { promoValidate } from "../validators/promo.validator.js";

const router = Router();

router.post("/show/all", promoCtrl.misPromociones);

router.post("/show/:id", promoCtrl.onePromocion);

router.post("/new", promoValidate, promoCtrl.createPromocion);

router.post("/edit/:id", promoValidate, promoCtrl.editPromocion);

router.post("/delete/:id", promoCtrl.deletePromocion);

export default router;
