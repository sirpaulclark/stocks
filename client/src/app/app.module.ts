import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { FilterPipe } from './pipes';

@NgModule({
  declarations: [
    FilterPipe,
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
