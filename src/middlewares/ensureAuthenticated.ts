import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authToken = request.headers.authorization;
    
    if (!authToken) {
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "641d47ee6b6810eddf4dd3c98c8f086e") as IPayload;

        request.user_id = sub;
        
        return next();
    } catch (err) {
        return response.status(401).end();
    }

}