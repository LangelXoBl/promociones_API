import * as dotenv from 'dotenv';
dotenv.config()
import app from './app.js';
import './DB.js';

const port = process.env.PORT | 3000;
app.listen(port);
console.log('Serve on port', port);
