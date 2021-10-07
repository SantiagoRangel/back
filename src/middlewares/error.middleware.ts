import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

/**
 * Middleware para hacer manejo correcto de los errorers que pueden producirse en la ejecución
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 */
function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  console.error('[ERROR] ', status, message);

  res.status(status).json({ message });
}

export default errorMiddleware;
