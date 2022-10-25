import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost:27017/prue");
    console.log("Conected with dabatabe", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
