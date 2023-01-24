import mongoose from "mongoose";

(async () => {
  try {
    const db = await mongoose.connect("mongodb+srv://xool:202000098@cluster0.rr55yis.mongodb.net/test?retryWrites=true&w=majority");
    console.log("Conected with dabatabe", db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
