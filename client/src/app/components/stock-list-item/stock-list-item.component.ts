import { Component, OnInit, Input } from '@angular/core';

import { YOptionData } from '../../models';
import { StockService } from '../../services';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.css']
})
export class StockListItemComponent implements OnInit {
  @Input() stock: YOptionData;

  public symbol: string;
  public name: string;
  public price: number;
  public change: number;
  public high: number;
  public low: number;

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    if (this.stock) {
      this.symbol = this.stock.optionChain.result[0].quote.symbol;
      this.name = this.stock.optionChain.result[0].quote.longName.replace(/&amp;/g, '&');
      this.price = Number(this.stock.optionChain.result[0].quote.regularMarketPrice);
      this.change = Number(this.stock.optionChain.result[0].quote.regularMarketChange);
      this.high = Number(this.stock.optionChain.result[0].quote.regularMarketDayHigh);
      this.low = Number(this.stock.optionChain.result[0].quote.regularMarketDayLow);
    }
  }

  public onClickAdd($event): void {
    if (this.stock) {
      this.stockService.addStockToWatchlist(this.symbol).subscribe(() => {
      this.stockService.getChangeToWatchlistEvent().emit(this.symbol);
    });
    }
  }
}
