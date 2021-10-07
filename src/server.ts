import 'reflect-metadata';
import App from './app';
import { UsersRoute } from './routes/users.route';
import { RestaurantsRoute } from './routes/restaurants.route';
import {UserTransactionsRoute} from './routes/usertransaction.route';

/**
 * Define las rutas para la app
 */
const app = new App([
    new UsersRoute(),
    new RestaurantsRoute(),
    new UserTransactionsRoute(),
]);


app.listen();
