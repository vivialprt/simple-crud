import dotenv from 'dotenv';
dotenv.config();

import http from "http";
import { routeRequest } from "./routes";


const PORT = Number(process.env.PORT) || 8080;

const server = http.createServer();

server.on("request", routeRequest);
server.on("error", err => {throw err;});

server.listen(PORT);
