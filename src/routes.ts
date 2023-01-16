import http from "http";
import { getReqBody } from "./middleware";
import {
    createUser,
    getUser,
    updateUser,
    deleteUser
} from "./endpoints";
import { User } from "./user";
import { AssertionError } from "assert";


let storage: User[] = [];

export async function routeRequest(
    request: http.IncomingMessage,
    response: http.ServerResponse
): Promise<void> {
    response.setHeader("Content-Type", "application/json");
    let body = await getReqBody(request);
    if (!request.url?.startsWith('/users/')) {
        response.statusCode = 404;
        response.write(JSON.stringify({"error": "No such URL"}));
        response.end();
        return;
    }
    let uuid = request.url?.split('/').at(-1) ?? '';    
    switch (request.method) {
        case "GET":
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
            break;

        case "POST":
            try {
                let user = await createUser(body, storage);
                response.statusCode = 201;
                response.write(JSON.stringify(user));
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
            if (uuid.length > 0) {  
                try {  // found
                    let user = await updateUser(body, uuid, storage);
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
            } else {  // no UUID
                response.statusCode = 405;
                response.write(JSON.stringify({"error": "Specify UUID"}));
                response.end();
            };
            break;

        case "DELETE":
            if (uuid.length > 0) {  
                try {  // found
                    storage = await deleteUser(uuid, storage);
                    response.statusCode = 204;
                    response.write(JSON.stringify([]));
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
            } else {  // no UUID
                response.statusCode = 405;
                response.write(JSON.stringify({"error": "Specify UUID"}));
                response.end();
            };
            break;

        default:
            response.statusCode = 400
            response.write("No Response")
            response.end()
    };
};
