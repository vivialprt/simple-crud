import http from "http";
import { routeRequest } from "./routes";


export function startServer(port: number): void {
    const server = http.createServer();

    server.on("request", routeRequest);
    server.on("error", err => {throw err;});

    server.listen(port);

}; 
