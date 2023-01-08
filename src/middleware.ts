import http from "http";


export function getReqBody(request: http.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            request.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            request.on("end", () => {
                // send back the data
                resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
};
