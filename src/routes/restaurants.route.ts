import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import RestaurantsService from '../services/restaurants.service';

/**
 * Rutas para Restaurantes
 */
export class RestaurantsRoute implements Route {
    public path = '/restaurants';
    public router = Router();
    public RestaurantsService = new RestaurantsService();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Solo se tiene una ruta para obtener una lista de restaurantes dado una latitud, longitud, un radio máximo en km
     */
    private initializeRoutes() {
        this.router.post(this.path, this.RestaurantsService.getRestaurants);
    }
}
