import * as express from 'express';
import { getConnection } from './database/db';
import Routes from './interfaces/routes.interface';
import authMiddleware from './middlewares/auth.middleware';
import errorMiddleware from './middlewares/error.middleware';


/**
 * Define la clase de app e inicializa todos los middlewares necesarios
 */
class App {
    public app: express.Application;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public async listen() {
        let retries = 5;
        while (retries) {
            try {
                await this.initializeConnection();
                break;
            } catch (err) {
                console.log(err);
                retries -= 1;
                await new Promise(res => setTimeout(res, 5000))
            }

        }
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(require('cors')());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            
            if (route.path == "/restaurants" || route.path =="/transaction") {

                this.app.use('/', authMiddleware, route.router);
            }
             else {
                this.app.use('/', route.router);
            }
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private async initializeConnection() {
        const db = await getConnection();

    }
}

export default App;

