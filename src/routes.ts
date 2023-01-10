import http from "http";
import { getReqBody } from "./middleware";
import {
    createUser,
    getUser
} from "./endpoints";
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
            if (request.url?.startsWith('/users/')) {  // valid url
                let uuid = request.url?.split('/').at(-1) ?? '';
                if (uuid.length > 0) {  // get by id
                    try {  // found
                        let user = await getUser(uuid, storage);
                        response.statusCode = 200;
                        response.write(JSON.stringify(user));
                        response.end();
                    } catch (err) {
                        if (err instanceof AssertionError) { // invalid uuid
                            response.statusCode = 400;
                            response.write(JSON.stringify({"error": "Invalid UUID"}));
                            response.end();
                        } else {  // not found
                            response.statusCode = 404;
                            response.write(JSON.stringify({"error": "No such UUID"}));
                            response.end();
                        };
                    }
                } else {  // get all
                    response.statusCode = 200;
                    response.write(JSON.stringify(storage));
                    response.end();
                };
            } else {  // invalid url
                response.statusCode = 400
                response.write(`Ashibka ${request.url}`)
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
                    response.statusCode = 500;
                    response.write(JSON.stringify({"error": "Internal server error"}));
                    response.end();
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
