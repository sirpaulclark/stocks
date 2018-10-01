export class Stock {
    public id: number;
    public symbol: string;
    public description: string;
    public type: string;
    public date: string;
    public price: number;
    public options: YOptions[] = [];
    public strikes: number[] = [];
    public url: string;
  
    constructor(symbol: string, description: string ='', type: string ='', date: string ='') {
        this.id = 0; // 0 is an invalid id 
        this.symbol = symbol.replace(/\//g, '-');
        this.description = description;
        this.type = type;
        this.date = date;
        this.price = 0;
        this.url = '';
    }
  
    public toString(): string {
      return `Symbol = ${this.symbol}, Price = ${this.price}`;
    }
  }
  
  // "Y" prefix is for Yahoo -- Yahoo Finance
  export interface YOptionData {
    optionChain: YOptionChain;
  }
  
  export interface YOptionChain {
    result: YOptionResult[];
    error: any;
  }
  
  export interface YOptionResult {
    underlyingSymbol: string;
    expirationDates: number[];
    strikes: number[];
    hasMiniOptions: boolean;
    quote: YOptionQuote;
    options: YOptions[];
  }
  
  export interface YOptionQuote {
    symbol: string;
    quoteType: string;
    shortName: string;
    longName: string;
    bid: number;
    ask: number;
    regularMarketPrice: number; //Current Price or Closing Price
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    regularMarketChange: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
  }
  
  export interface YOptions {
    expirationDate: number;
    hasMiniOptions: boolean;
    calls: YOption[];
    puts: YOption[]
  }
  
  export interface YOption {
    contractSymbol: string;
    strike: number;
    currency: string;
    lastPrice: number;
    change: number
    percentChange: number;
    volume: number;
    openInterest: number;
    bid: number;
    ask: number;
    contractSize: string;
    expiration: number;
    lastTradeDate: number;
    impliedVolatility: number;
    inTheMoney: boolean;
  }
  