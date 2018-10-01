import { Component, OnInit, Input } from '@angular/core';

import { Stock } from '../../models';
import { StockService } from '../../services';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.css']
})
export class WatchListItemComponent implements OnInit {
  @Input() stock: Stock;
  public symbol = '';

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    if (this.stock) {
      this.symbol = this.stock.symbol;
    }
  }

  public onClickRem($event): void {
    if (this.stock) {
      this.stockService.delStockFromWatchlist(this.stock.id).subscribe(() => {
        this.stockService.getChangeToWatchlistEvent().emit(this.stock.symbol);
      });
    }
  }
}
