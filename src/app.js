import Express from "express";
import morgan from "morgan";
import cors from "cors";
import routePromotions from "./routes/promociones.routes.js";
import routerProperties from "./routes/properties.routes.js";

const app = Express();

//*middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

//*Routes
app.use("/api/v2/myPromotions", routePromotions);
app.use("/api/v2/properties", routerProperties);

export default app;
