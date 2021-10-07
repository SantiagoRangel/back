import { NextFunction, Response } from 'express';
import { authReq } from '../interfaces/token.interface';
import { decodeToken } from '../utils/encryption';

/**
 * Este middleware funciona para autenticar peticiones que se hacen al back. Para esto se revusa que tenga token y luego que sea valido
 * @param req 
 * @param res 
 * @param next 
 * @returns para continuar con el proceso
 */
export default function authMiddleware(req: authReq, res: Response, next: NextFunction) {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decodedToken = decodeToken(token);
        req.decodedToken = decodedToken;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}


