
import { ExpiredToken } from '../entities/ExpiredToken';
import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import HttpError from '../exceptions/HttpException';
import { authReq } from '../interfaces/token.interface';
import { asyncRunner } from '../utils/async';


export default class ExpiredTokenService {

    /**
     * Crea el nuevo token expirado
     * @param req 
     * @param res 
     * @returns La nueva transacción
     */
    createExpiredToken = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const {
                token,
            }: { token: string;} = req.body;
            if (!( token )) {
                throw new HttpError(400, 'Missing required fields token');
            }
           
            let newExpiredToken = new ExpiredToken(
                token
            );
            newExpiredToken = await db.save(newExpiredToken);

            res.status(201).send({
                newExpiredToken
            });
        });
    };

    getExpiredTokens = async (req: authReq, res: Response) => {
        
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const rawData = await db.find(ExpiredToken);
            res.status(201).send(rawData);
        });
    };

 

    
}
/* module.exports ={

    getExpiredTokens: async function  (req: authReq, res: Response) {
        let db = new EntityManager();
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const rawData = await db.find(ExpiredToken);
            res.status(201).send(rawData);
        });
    };

} */
