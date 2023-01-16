import dotenv from 'dotenv';
dotenv.config();

import { startServer } from './server';

const PORT = Number(process.env.PORT) || 8080;

startServer(PORT);
