import * as express from 'express';
export const routerStocks = express.Router();

import { StockService } from '../../services';
import { Stock, YOptionData } from '../../models';

routerStocks.get('/', (req, res, next) => {
    let refresh = false;
    if( req.query.refresh) {
        refresh = true;
    }
    const stockService: StockService = StockService.getInstance();
    stockService.getAllOptionData(refresh).then((options: YOptionData[]) => {
        res.status(200).json(options);
    });
});
