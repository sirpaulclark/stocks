import { Component, OnInit } from '@angular/core';
import { StockService, UtilService } from '../../services';
import { YOptionData } from '../../models';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  private alphaSort = true;
  private numSort = true;

  public filterString: string;
  public disableBtn = true;
  public stockData: YOptionData[] = [];

  constructor(
    private stockService: StockService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.getStocks(false);
  }

  public sort(type: string): void {
    this.filterString = '';
    if ('alpha' === type) {
      this.stockData.sort((a, b) => this.compareAlphaOption(a, b));
      this.alphaSort = !this.alphaSort;
    } else if ('num') {
      this.stockData.sort((a, b) => this.compareNumOption(a, b));
      this.numSort = !this.numSort;
    }
  }

  public refresh(): void {
    this.filterString = '';
    this.disableBtn = true;
    this.stockData = [];
    this.getStocks(true);
  }

  private compareAlphaOption(a: YOptionData, b: YOptionData): number {
    return this.utilService.compareStrings(
      a.optionChain.result[0].underlyingSymbol,
      b.optionChain.result[0].underlyingSymbol,
      this.alphaSort);
  }

  private compareNumOption(a: YOptionData, b: YOptionData): number {
    return this.utilService.compareNumbers(
        a.optionChain.result[0].quote.regularMarketPrice,
        b.optionChain.result[0].quote.regularMarketPrice,
        this.numSort);
  }

  private getStocks(refresh: boolean): void {
    this.stockService.getStockData(refresh)
    .subscribe((data: YOptionData[]) => {
      this.disableBtn = false;
      this.stockData = data;
    });
  }
}
