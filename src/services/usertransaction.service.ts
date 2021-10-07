
import { UserTransaction } from '../entities/UserTransaction';
import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import HttpError from '../exceptions/HttpException';
import { authReq } from '../interfaces/token.interface';
import { asyncRunner } from '../utils/async';


export default class UsersService {

    /**
     * Crea nueva transacción
     * @param req 
     * @param res 
     * @returns La nueva transacción
     */
    createTransaction = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const {
                amount,
            }: { amount: number;} = req.body;
            if (!( amount )) {
                throw new HttpError(400, 'Missing required fields amount');
            }
           
            let newTransaction = new UserTransaction(
                amount
            );
            newTransaction = await db.save(newTransaction);

            res.status(201).send({
               newTransaction
            });
        });
    };

    getTransactions = async (req: authReq, res: Response) => {
        
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const rawData = await db.find(UserTransaction);
            res.status(201).send(rawData);
        });
    };

 

    
}
