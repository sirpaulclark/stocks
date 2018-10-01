import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { YOptionData, Stock } from '../models';

export const server = 'http://localhost:3000';
export const urlStock = `${server}/stocks`;
export const urlWatchlist = `${server}/watchlist`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private _showStockList = false;
  private _changeToWatchlistEmitter: EventEmitter<string> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) { }

  public getShowStockList(): boolean {
    return this._showStockList;
  }

  public setShowStockList(enable: boolean): void {
    this._showStockList = enable;
  }

  public getChangeToWatchlistEvent(): EventEmitter<string> {
    return this._changeToWatchlistEmitter;
  }

  public getStockData(refresh = false): Observable<YOptionData[]> {
    let params: HttpParams;
    if (refresh) {
      params = new HttpParams().set('refresh', `${refresh}`);
    }
    return this.httpClient.get<YOptionData[]>(urlStock, refresh ? {params} : undefined)
    .pipe(
      catchError(error => {
        return this.handleError<YOptionData[]>(`getStockData`, error, []);
      })
    );
  }

  public getWatchlist(full: boolean = false): Observable<Stock[]> {
    let params: HttpParams;
    if (full) {
      params = new HttpParams().set('full', `${full}`);
    }
    return this.httpClient.get<Stock[]>(urlWatchlist, full ? {params} : undefined)
    .pipe(
      catchError(error => {
        return this.handleError<Stock[]>(`getWatchlist`, error, []);
      })
    );
  }

  public addStockToWatchlist(stock: string) {
    return this.httpClient.post(urlWatchlist, {symbol: stock}, httpOptions)
    .pipe(
      catchError(error => {
        return this.handleError<any>(`addStockToWatchlist(${stock})`, error, {});
      })
    );
  }

  public delStockFromWatchlist(stockId: number) {
    return this.httpClient.delete(`${urlWatchlist}/${stockId}`, httpOptions)
    .pipe(
      catchError(error => {
        return this.handleError<any>(`delStockFromWatchlist(${stockId})`, error, {});
      })
    );
  }

  private handleError<T>(message: string, error: any, retObj: T): Observable<T> {
    console.error(`[${message}]: ${error}`);
    return of<T>(retObj);
  }
}
