import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import UsersService from '../services/users.service';

/**
 * Rutas de User
 */
export class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersService = new UsersService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Se inclute las rutas para obtener los usuarios, crear un usuario, ligin, y actualizar
     */
    private initializeRoutes() {
        this.router.get(this.path, this.usersService.getUsers);
        this.router.post(this.path, this.usersService.createUser);
        this.router.put(this.path, this.usersService.updateUser);
        this.router.post(`${this.path}/login`, this.usersService.login);
        this.router.post(`${this.path}/logout`, this.usersService.logout);
    }
}
