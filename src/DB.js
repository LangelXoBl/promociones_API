import * as dotenv from 'dotenv';
dotenv.config()
import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    console.log("Conected with dabatabe", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
