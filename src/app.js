import Express from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/promociones.routes.js";

const app = Express();

//*middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

//*Routes
app.use("/myPromotions", route);

export default app;