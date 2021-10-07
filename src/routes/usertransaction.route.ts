import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import UserTransactionService from '../services/userTransaction.service';


/**
 * Rutas para UserTransaction
 */
export class UserTransactionsRoute implements Route {
    public path = '/transaction';
    public router = Router();
    public UserTransactionsService = new UserTransactionService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Se incluye las rutas para crear una transacción dado un monto y otra para obtener el historial de transacciones
     */
    private initializeRoutes() {
        this.router.post(this.path, this.UserTransactionsService.createTransaction);
        this.router.get(this.path, this.UserTransactionsService.getTransactions);
    }
}
