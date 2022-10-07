import Router from "express";
import * as propertiesCtrl from "../controllers/properties.controller.js";

const router = Router();
router.post("/detail", propertiesCtrl.properties);

export default router;
