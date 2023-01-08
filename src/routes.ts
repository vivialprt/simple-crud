import http from "http";


export function routeRequest(
    request: http.IncomingMessage,
    response: http.ServerResponse
): void {
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
            break;
        
        case "PUT":
            break;
    
        case "DELETE":
            break;
    
        default:
            response.statusCode = 400
            response.write("No Response")
            response.end()
    }
};
