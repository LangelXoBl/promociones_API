import { config } from 'dotenv';

config();

export const MONGO_URL = process.env.MONGO_URL || 'https://localhost';
export const PORT = process.env.PORT || 3000;
