import { ExpiredToken } from '../entities/ExpiredToken';
import {  Request, Response } from 'express';
import { EntityManager } from 'typeorm';
import { User } from '../entities/User';
import HttpError from '../exceptions/HttpException';
import { authReq } from '../interfaces/token.interface';
import { asyncRunner } from '../utils/async';
import { generateJWT, hashPassword, passwordMatch } from '../utils/encryption';
import { filterUndefined } from '../utils/other';

export default class UsersService {

    /**
     * Crea un usuario dado un correo, nombre y contraseña
     * @param req 
     * @param res 
     * @returns retorna el objeto del usuario y el jwt
     */
    createUser = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const {
                email,
                password,
                name,
            }: { email: string; name: string; [key: string]: any } = req.body;
            if (!(email && password && name)) {
                throw new HttpError(400, 'Missing required fields email, password and name');
            }

            const existingUser = await db.findOne(User, { where: { email } });

            if (existingUser) {
                throw new HttpError(409, `A user with the email ${email} already exists`);
            }

            const hashPass = await hashPassword(password);
            let newUser = new User(
                name.trim(),
                email.toLowerCase(),
                hashPass,
               
            );
            newUser = await db.save(newUser);

            res.status(201).send({
                token: generateJWT(newUser),
                email: newUser.email,
                name: newUser.name,
            });
        });
    };

    /**
     * Autentica un usuario con su contraseña y correo
     * @param req 
     * @param res 
     * @returns el correo, el nombre y el jwt
     */
    login = async (req: Request, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const { email, password}: { email: string; [key: string]: any } = req.body;
            if (!(email && password)) {
                throw new HttpError(400, 'Missing required fields email or password');
            }
            let user = await db.findOne(User, { where: { email: email.toLowerCase() } });

            if (!user) {
                throw new HttpError(404, `User does not exist`);
            }

            passwordMatch(password, user.password);

            res.status(201).send({
                token: generateJWT(user),
                email: user.email,
                name: user.name,
            });
        });
    };


    /**
     * Añade el token expirado a la lista de tokens expirados para invalidar peticiones que lo usen
     * @param req 
     * @param res 
     * @returns retorna el objeto de token expirado creado 
     */
    logout = async (req: Request, res: Response) => {
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

    /**
     * Actualiza un usuario
     * @param req 
     * @param res 
     * @returns 
     */
    updateUser = async (req: authReq, res: Response) => {
        const userId = req.decodedToken?._id;
        if (!userId) return res.status(401).send('Unauthorized');

        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            let { name,  email }: { email: string; [key: string]: any } = req.body;

            if (!name && !email) {
                throw new HttpError(400, 'Missing required fields name or email');
            }
            if (email) email = email.toLowerCase();

            const result = await db.update(User, { id: userId }, filterUndefined({ name, email }));
            res.status(200).send(result.generatedMaps[0]);
        });
    };

    /**
     * Obtiene la lista de usuarios
     * @param req 
     * @param res 
     * @returns lista de ususarios
     */
    getUsers = async (req: authReq, res: Response) => {
        
        return asyncRunner(req, res, async (req: Request, res: Response, db: EntityManager) => {
            const rawData = await db.find(User);
            res.status(201).send(rawData);
        });
    };

    
}
