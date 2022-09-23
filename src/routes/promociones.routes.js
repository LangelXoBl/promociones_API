import { Router } from "express";
import * as promoCtrl from "../controllers/promociones.controller.js";
import { promoValidate } from "../validators/promo.validator.js";

const router = Router();

router.get("/all", promoCtrl.misPromociones);

router.get("/:id", promoCtrl.onePromocion);

router.post("/",promoValidate, promoCtrl.createPromocion);

router.put("/:id",promoValidate, promoCtrl.editPromocion);

router.delete("/:id", promoCtrl.deletePromocion);

export default router;
