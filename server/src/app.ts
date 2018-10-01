import express from 'express';
import { Request, Response, NextFunction, Errback} from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { routerStocks, routerWatchlist } from './api/routes';
import { ExError } from './util';
import { StockService } from './services';

class App {
    public app: express.Application;
    private stockService: StockService = StockService.getInstance();

    constructor() {
        this.app = express();
        this.config();
        
        // Initialize stock and watch lists
        // [TODO] - don't initialize when testing
        this.stockService.getAllOptionData().then(() => console.log('Ready!'));
        this.stockService.getWatchlist();
    }

    private config(): void{
        //Logging
        // [TODO] - don't log when testing
        this.app.use(morgan('dev'))
               
        // Support application/json type post data and urlencoded
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //Add CORS access -- Add headers to all responses
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 
                'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 
                    'GET, POST, PUT, DELETE');
                return res.status(200).json({});
            }
            next();
        });
        
        // Main Routes
        this.app.use('/stocks', routerStocks);
        this.app.use('/watchlist', routerWatchlist);

        // Error handling for bad request and server errors
        this.app.use((req, res, next) => {
            const error = new ExError('Not Found');
            error.status = 404;
            next(error);
        });
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        });
    }
}

export default new App().app;
