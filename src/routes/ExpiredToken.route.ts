import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import ExpiredTokenService from '../services/expiredtoken.service';


/**
 * Rutas para ExpiredToken
 */
export class ExpiredTokenRoute implements Route {
    public path = '/expiredToken';
    public router = Router();
    public UserTransactionsService = new ExpiredTokenService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Se incluye las rutas para crear un jwt expirado dado su token y otra para obtener el historial de tokens expirados
     */
    private initializeRoutes() {
        this.router.post(this.path, this.UserTransactionsService.createExpiredToken);
        this.router.get(this.path, this.UserTransactionsService.getExpiredTokens);
    }
}
