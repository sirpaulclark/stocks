import { Component } from '@angular/core';
import { StockService, UtilService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Paul\'s Stock Application';

  constructor(
    private stockService: StockService,
    private utilService: UtilService
   ) {}
}
