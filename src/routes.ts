import http from "http";
import { getReqBody } from "./middleware";
import { createUser } from "./endpoints";
import { User } from "./user";
import { AssertionError } from "assert";


let storage: User[] = [];

export async function routeRequest(
    request: http.IncomingMessage,
    response: http.ServerResponse
): Promise<void> {
    let body = await getReqBody(request);
    switch (request.method) {
        case "GET":
            switch (request.url) {
            // response for unexpected get requests
                default:
                    response.statusCode = 400
                    response.write(`CANNOT GET ${request.url}`)
                    response.end()
            };
            break;

        case "POST":
            try {
                let id = await createUser(body, storage);
                response.statusCode = 201;
                response.write(JSON.stringify({"id": id}));
                response.end();
            } catch (err) {
                if (err instanceof AssertionError) {
                    response.statusCode = 400;
                    response.write(JSON.stringify({"error": err.message}));
                    response.end();
                } else {
                    throw err;
                };
            }
            break;

        case "PUT":
            break;

        case "DELETE":
            break;

        default:
            response.statusCode = 400
            response.write("No Response")
            response.end()
    };
};
