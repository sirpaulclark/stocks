import * as express from 'express';
import { StockService } from '../../services';

export const routerWatchlist = express.Router();

// Get all the stocks in the watchlist
routerWatchlist.get('/', (req, res, next) => {
    if( req.query.full) {
        StockService.getInstance().getWatchlistWithOptionData().then(stocks => {
            res.status(200).json(stocks);
        });
    } else {
        StockService.getInstance().getWatchlist().then(stocks => {
            res.status(200).json(stocks);
        });
    }
});

// Watchlist - CRUD
routerWatchlist.post('/', (req, res, next) => {
    if (!req.body.symbol) {
        res.status(400).send('Missing \'symbol\' in body');
    } else {
        if (StockService.getInstance().addWatchlistEntry(req.body.symbol)) {
            res.status(201).send();
        } else {
            res.status(409).send('Duplicate stock symbol')
        }
        
    }
});

routerWatchlist.get('/:stockId', (req, res, next) => {
    const id = req.params.stockId;
    if (isNaN(id)) {
        res.status(400).send('Invalid \'id\' in URL');
    } else {
        StockService.getInstance().getWatchlistEntry(id).then(stock => {
            res.status(200).json(stock);
        }).catch(error => {
            res.status(404).send();
        });    
    }
});

routerWatchlist.put('/:stockId', (req, res, next) => {
    const id = req.params.stockId;
    if (isNaN(id)) {
        res.status(400).send('Invalid \'id\' in URL');
    } else {
        if (!req.body.symbol) {
            res.status(400).send('Missing \'symbol\' in body');
        } else {
            if (StockService.getInstance().updateWatchlistEntry(id, req.body.symbol)) {
                res.status(200).send();
            } else {
                res.status(400).send();
            }
        }
    }
});

routerWatchlist.delete('/:stockId', (req, res, next) => {
    const id = req.params.stockId;
    if (isNaN(id)) {
        res.status(400).send('Invalid \'id\' in URL');
    } else {
        StockService.getInstance().delWatchlistEntry(id);
        res.status(204).send();
    }
});
