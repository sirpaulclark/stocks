import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StockService } from '../../services';
import { Stock } from '../../models';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit, OnDestroy {
  public disableTrashBtn = true;
  public stocks: Stock[] = [];

  private changeWatchlist: Subscription;
  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.getStocks();
    this.changeWatchlist = this.stockService.getChangeToWatchlistEvent().subscribe(symbol => {
      this.getStocks();
    });
  }

  ngOnDestroy() {
    this.changeWatchlist.unsubscribe();
  }

  public onClickTrash($event): void {
    this.stocks.forEach(stock => {
      this.stockService.delStockFromWatchlist(stock.id).subscribe(() => {});
    });
    this.stocks = [];
    this.disableTrashBtn = true;
  }

  private getStocks(): void {
    this.stockService.getWatchlist().subscribe(data => {
      this.stocks = data;
      if (this.stocks.length > 0) {
        this.disableTrashBtn = false;
      }
    });
  }
}
