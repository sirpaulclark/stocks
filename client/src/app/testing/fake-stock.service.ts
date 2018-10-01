import { EventEmitter } from '@angular/core';
import { YOptionData, Stock } from '../models';
import { asyncData } from './helpers';


const option1: YOptionData = {
    optionChain: {
      result: [{
        underlyingSymbol: 'xyz',
        expirationDates: [55555, 66666],
        strikes: [10, 11, 12, 13, 14],
        hasMiniOptions: false,
        quote: {
          symbol: 'xyz',
          quoteType: '',
          shortName: '',
          longName: 'Company XYZ Inc',
          bid: 1,
          ask: 1,
          regularMarketPrice: 12.25,
          regularMarketPreviousClose: 12.15,
          regularMarketOpen: 12.10,
          regularMarketChange: .15,
          regularMarketDayHigh: 12.30,
          regularMarketDayLow: 12.09,
        },
        options: []
      }],
      error: null
    }
  };

const option2: YOptionData = {
    optionChain: {
      result: [{
        underlyingSymbol: 'abc',
        expirationDates: [55555, 66666],
        strikes: [20, 21, 22, 23, 24],
        hasMiniOptions: false,
        quote: {
          symbol: 'abc',
          quoteType: '',
          shortName: '',
          longName: 'Company ABC Inc',
          bid: 1,
          ask: 1,
          regularMarketPrice: 22.25,
          regularMarketPreviousClose: 22.15,
          regularMarketOpen: 22.10,
          regularMarketChange: -.15,
          regularMarketDayHigh: 22.30,
          regularMarketDayLow: 22.09,
        },
        options: []
      }],
      error: null
    }
  };

const option3: YOptionData = {
    optionChain: {
      result: [{
        underlyingSymbol: 'mno',
        expirationDates: [55555, 66666],
        strikes: [30, 31, 32, 33, 34],
        hasMiniOptions: false,
        quote: {
          symbol: 'mno',
          quoteType: '',
          shortName: '',
          longName: 'Company MNO Inc',
          bid: 1,
          ask: 1,
          regularMarketPrice: 32.25,
          regularMarketPreviousClose: 32.15,
          regularMarketOpen: 32.10,
          regularMarketChange: .15,
          regularMarketDayHigh: 32.30,
          regularMarketDayLow: 32.09,
        },
        options: []
      }],
      error: null
    }
  };

export const options: YOptionData[] = [option1, option2, option3];

export function getFakeOptions(): YOptionData[] { return options; }

const stock1: Stock = {
  id: 1,
  symbol: 'xyz',
  description: 'Company XYZ Inc',
  type: '',
  date: '',
  price: 12.25,
  options: [],
  strikes: [],
  url: ''
};

const stock2: Stock = {
  id: 2,
  symbol: 'abc',
  description: 'Company ABC Inc',
  type: '',
  date: '',
  price: 22.25,
  options: [],
  strikes: [],
  url: ''
};

const stock3: Stock = {
  id: 3,
  symbol: 'mno',
  description: 'Company MNO Inc',
  type: '',
  date: '',
  price: 32.25,
  options: [],
  strikes: [],
  url: ''
};

export const stocks: Stock[] = [stock1, stock2, stock3];

export const eventWatchList: EventEmitter<string> = new EventEmitter();

export function getFakeStockService() {
  const fakeStockService = jasmine.createSpyObj('StockService', [
    'getStockData',
    'getWatchlist',
    'addStockToWatchlist',
    'delStockFromWatchlist',
    'getChangeToWatchlistEvent'
  ]);
  fakeStockService.getStockData.and.returnValue(asyncData(options));
  fakeStockService.getWatchlist.and.returnValue(asyncData(stocks));
  fakeStockService.addStockToWatchlist.and.returnValue(asyncData('ADD'));
  fakeStockService.delStockFromWatchlist.and.returnValue(asyncData('DEL'));
  fakeStockService.getChangeToWatchlistEvent.and.returnValue(eventWatchList);
  return fakeStockService;
}
