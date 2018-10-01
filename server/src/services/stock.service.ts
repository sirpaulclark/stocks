import * as csv from 'fast-csv';
import * as fs from 'fs';
import rp from 'request-promise';
import { Stock, YOptionData } from '../models'

const CBOE_STOCKS: string = 'data/stocks.csv'; // List retrived for the CBOE
// Watchlist 
// [TODO] move to a database
// [TODO] functionality --> named multiple watchlists
const WATCH_LIST: string = 'data/watchlist.json' 
const YAHOO_OPTIONS: string = 'https://query1.finance.yahoo.com/v7/finance/options/'; // Just add the symbol to end

export class StockService {
    private static _instance: StockService = new StockService();
    private static _stocks: Stock[] = [];
    private static _stockOptions: YOptionData[] = [];
    private static _watchlist: Stock[] = [];

    public static getInstance(): StockService {
        return StockService._instance;
    }

    public getAllStocks(): Promise<Stock[]> {
        return new Promise<Stock[]>((resolve, reject) => {
            if (StockService._stocks.length === 0) {
                csv.fromPath(CBOE_STOCKS)
                .on("data", (data: string[]) => {
                    StockService._stocks.push(new Stock(data[0], data[2], data[3], data[4]));
                })
                .on("end", () => {
                    console.log(`Number of stocks to search is [${StockService._stocks.length}]`);
                    resolve(StockService._stocks);
                })
                .on("data-invalid", (error: string) => {
                    console.error(`Invalid data\n${error}`);
                    reject(error);
                });
            } else {
                resolve(StockService._stocks);
            }
        });
    }

    public getAllOptionData(refresh: boolean = false): Promise<YOptionData[]> {
        if (StockService._stockOptions.length === 0) {
            refresh = true;
        }

        if (refresh) {
            return this.getAllStocks().then((stocks: Stock[]) => {
                return this.getOptionData(stocks).then((options: YOptionData[]) => {
                    StockService._stockOptions = options;
                    return StockService._stockOptions;
                });
            });
        }
        return Promise.resolve(StockService._stockOptions);
    }

    public getOptionData(stocks: Stock[]): Promise<YOptionData[]> {
        const options = {
            uri: '',
        };
        
        const stockOptions: YOptionData[] = [];
        const promises: any[] = [];
        for (let i: number = 0; i < stocks.length; i++) {
            options.uri = YAHOO_OPTIONS + stocks[i].symbol;
            promises.push(rp(options)
                .then((data: any) => {
                    stockOptions.push(JSON.parse(data));
                })
                .catch((error: any) => {
                    console.log(`Failed to get quote for ${stocks[i].symbol}, Error - ${error}`);
                }));
        }
        return Promise.all(promises).then(() => stockOptions);
    }

    public getWatchlist(): Promise<Stock[]> {
        if (StockService._watchlist.length === 0) {
            if (fs.existsSync(WATCH_LIST)) {
                const buffer = fs.readFileSync(WATCH_LIST);

                fs.readFile
                StockService._watchlist = <Stock[]>JSON.parse(buffer.toString());     
            }
        }
        return Promise.resolve(StockService._watchlist);
    }

    public getWatchlistWithOptionData(): Promise<Stock[]> {
        return this.getOptionData(StockService._watchlist).then(optionData => {
            const watchlist: Stock[] = [];
            const date: Date = new Date();
            const strDate: string = this.getDateString();
            
            let stock: Stock;
            for (let i = 0; i < optionData.length; i++){
                stock = this.getStockWithOptionData(optionData[i], strDate);
                watchlist.push(stock);
            }
            return watchlist;
        });
    }

    public getWatchlistEntry(id: number): Promise<Stock> {
        const stocks: Stock[] = [];
        const stock = StockService._watchlist.find(stock => {
            return Number(id) === Number(stock.id);
        })
        if (!stock) {
            return Promise.reject();
        }
        stocks.push(stock);
        return this.getOptionData(stocks).then(optionData => {
            return this.getStockWithOptionData(optionData[0]);
        });
    }

    public addWatchlistEntry(symbol: string) : boolean {
        let stock = StockService._watchlist.find(stock => {
            return stock.symbol === symbol; 
        });
        if (stock) {
            return false;
        }
        
        stock = new Stock(symbol);
        StockService._watchlist.push(stock);
        
        // Get next ID
        let max = 0;
        StockService._watchlist.forEach(stock => {
            max = Math.max(max, stock.id);
        });
        stock.id = max + 1;

        fs.writeFileSync(WATCH_LIST, JSON.stringify(StockService._watchlist));
        return true;
    }

    public updateWatchlistEntry(id: number, symbol: string): boolean {
        // Find stock to modify
        const stock = StockService._watchlist.find(stock => {
            return Number(id) === Number(stock.id);
        })

        // Verify no duplicates
        const stock2 =  StockService._watchlist.find(stock => {
            return symbol === stock.symbol;
        })

        if (stock && !stock2) {
            stock.symbol = symbol;
            fs.writeFileSync(WATCH_LIST, JSON.stringify(StockService._watchlist));
            return true;
        }
        return false;
    }

    public delWatchlistEntry(id: number): void {
        const index = StockService._watchlist.findIndex(stock => {
            return Number(id) === Number(stock.id);
        })
        if (index !== -1) {
            StockService._watchlist.splice(index, 1);
            fs.writeFileSync(WATCH_LIST, JSON.stringify(StockService._watchlist));
        }
    }

    private getStockWithOptionData(option: YOptionData, strDate: string = ''): Stock {
        if (strDate.length === 0) {
            strDate = this.getDateString();
        }
        const stock = new Stock(
            option.optionChain.result[0].quote.symbol,
            option.optionChain.result[0].quote.longName,
            option.optionChain.result[0].quote.quoteType,
            strDate
        );
        stock.options = option.optionChain.result[0].options;
        stock.price   = option.optionChain.result[0].quote.regularMarketPrice;
        stock.strikes = option.optionChain.result[0].strikes;
        return stock;
    }

    private getDateString(): string {
        const date: Date = new Date();
        let sDate = `${date.getFullYear()}`
        let num: number = date.getMonth() + 1;
        sDate += (num < 10 ? '0' : '') + Number(num).toString();
        num = date.getDate();
        sDate += (num < 10 ? '0' : '') + Number(num).toString();
        return sDate;
    }
}
