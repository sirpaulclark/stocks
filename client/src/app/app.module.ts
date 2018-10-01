import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import {
  HeaderComponent,
  FooterComponent,
  StockListComponent,
  StockListItemComponent,
  StockReportComponent,
  WatchListComponent,
  WatchListItemComponent
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StockListComponent,
    StockListItemComponent,
    StockReportComponent,
    WatchListComponent,
    WatchListItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
