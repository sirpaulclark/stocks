import { Component, OnInit } from '@angular/core';

import { StockService, UtilService } from '../../services';
import { Stock, YOption } from '../../models';

export class ReportItem {
  symbol: string;
  description: string;
  price: number;
  otmStrike: number;
  otmMidPrice: number;
  otmRatio: number;
  itmStrike: number;
  itmMidPrice: number;
  itmRatio: number;
}

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
export class StockReportComponent implements OnInit {
  public disableRunBtn = true;
  public reportItems: ReportItem[] = [];

  private stocks: Stock[] = [];
  private decending = true;

  constructor(
    private stockService: StockService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    // Only test that there are stocks in the watch list
    this.stockService.getWatchlist(false).subscribe((stocks: Stock[]) => {
      if (stocks.length > 0) {
        this.disableRunBtn = false;
      }
    });
  }

  // Could write individual sort methods for each header
  // Made the decision to do one method for maintainablity
  public sort(type: string): void {
    this.reportItems.sort((a: ReportItem, b: ReportItem) => {
      switch (type) {
        case 'sym':
          return this.utilService.compareStrings(a.symbol, b.symbol, this.decending);
        case 'des':
          return this.utilService.compareStrings(a.description, b.description, this.decending);
        case 'pri':
          return this.utilService.compareNumbers(a.price, b.price, this.decending);
        case 'ost':
          return this.utilService.compareNumbers(a.otmStrike, b.otmStrike, this.decending);
        case 'omd':
          return this.utilService.compareNumbers(a.otmMidPrice, b.otmMidPrice, this.decending);
        case 'ora':
          return this.utilService.compareNumbers(a.otmRatio, b.otmRatio, this.decending);
        case 'ist':
          return this.utilService.compareNumbers(a.itmStrike, b.itmStrike, this.decending);
        case 'imd':
          return this.utilService.compareNumbers(a.itmMidPrice, b.itmMidPrice, this.decending);
        case 'ira':
          return this.utilService.compareNumbers(a.itmRatio, b.itmRatio, this.decending);
      }
    });
    this.decending = !this.decending;
  }

  public onClickRun($event): void {
    this.disableRunBtn = true;
    this.stockService.getWatchlist(true).subscribe((stocks: Stock[]) => {
      this.stocks = stocks;
      this.reportItems = [];
      if (this.stocks.length > 0) {
        this.buildReport();
        this.disableRunBtn = false;
      }
    });
  }

  private buildReport(): void {
    let puts: YOption[];
    let put: YOption, putIn: YOption, putOut: YOption;
    let limIn: number, limOut: number;
    let ratIn: number, ratOut: number;
    let putCnt = 1;

    let foundITM: boolean;
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].options && this.stocks[i].options.length === 0) {
        continue; // Go to next stock
      }
      puts = this.stocks[i].options[0].puts;
      foundITM = false;
      for (let j = 0; j < puts.length; j++) {
        put = puts[j];
        // Find the first in-the-money put, and the last out-the-money put
        if (put.inTheMoney) {
          foundITM = true;
          putIn = puts[j];
          putOut = puts[j - 1]; // the order is always static

          // Verify data;
          if (this.verifyPut(putIn, putOut)) {
            limIn = putIn.bid === 0 || putIn.ask === 0 ? putIn.lastPrice : ((putIn.bid + putIn.ask) / 2);
            limOut = putOut.bid === 0 || putOut.ask === 0 ? putOut.lastPrice : ((putOut.bid + putOut.ask) / 2);
            ratIn = (limIn * 100) / putIn.strike;
            ratOut = (limOut * 100) / putOut.strike;

            const reportItem = new ReportItem();
            reportItem.symbol = this.stocks[i].symbol;
            reportItem.description = this.stocks[i].description;
            reportItem.description = reportItem.description.replace(/,/g, '');
            reportItem.description = reportItem.description.replace(/&amp;/g, '&');
            reportItem.price = this.stocks[i].price;
            reportItem.otmStrike = putOut.strike;
            reportItem.otmMidPrice = limOut;
            reportItem.otmRatio = ratOut;
            reportItem.itmStrike = putIn.strike;
            reportItem.itmMidPrice = limIn;
            reportItem.itmRatio = ratIn;
            this.reportItems.push(reportItem);
          } else {
              // Logging, but not that important.
              // Yahoo Finance sometimes doesn't send all the information
              console.log(`${putCnt++}) Puts didn't match up - ${this.stocks[i].symbol}`);
          }
          break;
        }
      }
      if (!foundITM) {
        console.log(`Stock [${this.stocks[i].symbol}] does NOT contain any In-The-Money option information`);
      }
    }
  }

  private verifyPut(putIn: YOption, putOut: YOption): boolean {
    if (putIn === undefined || putOut === undefined) {
        return false;
    }
    return true;
  }
}
