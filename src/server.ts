import 'reflect-metadata';
import App from './app';
import { UsersRoute } from './routes/users.route';
import { RestaurantsRoute } from './routes/restaurants.route';
import {UserTransactionsRoute} from './routes/usertransaction.route';
import { ExpiredTokenRoute } from './routes/ExpiredToken.route';

/**
 * Define las rutas para la app
 */
const app = new App([
    new UsersRoute(),
    new RestaurantsRoute(),
    new UserTransactionsRoute(),
    new ExpiredTokenRoute(),
]);


app.listen();
