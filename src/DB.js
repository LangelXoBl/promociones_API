import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost/promociones");
    console.log("Conected with dabatabe", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
