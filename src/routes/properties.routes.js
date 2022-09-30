import Router from "express";
import * as propertiesCtrl from "../controllers/properties.controller.js";

const router = Router();
router.post("/show/all", propertiesCtrl.properties);

export default router;
