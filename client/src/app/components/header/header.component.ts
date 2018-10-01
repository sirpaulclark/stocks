import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(
    public stockService: StockService
  ) { }

  ngOnInit() {
  }

  public clickReport(): void {
    this.stockService.setShowStockList(false);
  }

  public clickStocks(): void {
    this.stockService.setShowStockList(true);
  }
}
