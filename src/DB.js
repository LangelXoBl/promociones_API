import { MONGO_URL } from './config.js';
import mongoose from 'mongoose';

(async () => {
  try {
    const db = await mongoose.connect(MONGO_URL);
    console.log('Conected with dabatabe', db.connection.name);
  } catch (e) {
    console.error(e);
  }
})();
