import { NextFunction, Response } from 'express';
import { authReq } from '../interfaces/token.interface';
import { decodeToken } from '../utils/encryption';
import {getManager} from "typeorm";
import { ExpiredToken } from '../entities/ExpiredToken';
/**
 * Este middleware funciona para autenticar peticiones que se hacen al back. Para esto se revisa que tenga token y luego que sea valido
 * También revisa que el token no esté en la lista de tokens expirados
 * @param req 
 * @param res 
 * @param next 
 * @returns para continuar con el proceso
 */
export default async function authMiddleware(req: authReq, res: Response, next: NextFunction) {
    const entityManager = getManager(); 
    const expiredTokens = await entityManager.find(ExpiredToken);
    let expiredTokensList = [];
    expiredTokens.forEach(expiredToken => {
        expiredTokensList.push(expiredToken.token)
    });
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;

    
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    if(expiredTokensList.indexOf(token) != -1){
        return res.status(401).send("Invalid Token");
    }
    try {
        const decodedToken = decodeToken(token);
        req.decodedToken = decodedToken;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}


