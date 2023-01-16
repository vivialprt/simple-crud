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
                body.length > 0 ? resolve(JSON.parse(body)) : resolve({});
            });
        } catch (error) {
            reject(error);
        }
    });
};
