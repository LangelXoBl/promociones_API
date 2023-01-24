import { PORT, MONGO_URL } from './config.js';
import app from './app.js';
import './DB.js';

app.listen(PORT);
console.log('Serve on port', PORT);
