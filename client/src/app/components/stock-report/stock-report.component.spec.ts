import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StockService } from '../../services';
import { getFakeStockService } from '../../testing';

import { StockReportComponent, ReportItem } from './stock-report.component';

const item1: ReportItem = {
  symbol: 'abc',
  description: 'Company ABC Inc.',
  price: 10.55,
  otmStrike: 10.00,
  otmMidPrice: .15,
  otmRatio: 1.42,
  itmStrike: 10.50,
  itmMidPrice: .20,
  itmRatio: 1.89
};

const item2: ReportItem = {
  symbol: 'xyz',
  description: 'Company XYZ Inc.',
  price: 20.72,
  otmStrike: 20.00,
  otmMidPrice: .21,
  otmRatio: 1.01,
  itmStrike: 21.00,
  itmMidPrice: .32,
  itmRatio: 1.54
};

const item3: ReportItem = {
  symbol: 'mno',
  description: 'Company ABC Inc.',
  price: 30.89,
  otmStrike: 30.00,
  otmMidPrice: .62,
  otmRatio: 2.01,
  itmStrike: 31.00,
  itmMidPrice: .92,
  itmRatio: 2.99
};

const reportItems: ReportItem[] = [item1, item2, item3];

describe('StockReportComponent', () => {
  let component: StockReportComponent;
  let fixture: ComponentFixture<StockReportComponent>;
  let service: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReportComponent ],
      providers: [
        { provide: StockService, useValue: getFakeStockService() }
      ],
      imports: [
        NgbTooltipModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReportComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StockService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should enable button if stocks are in the watchlist during initialization', fakeAsync(() => {
    expect(component.disableRunBtn).toBeTruthy();
    fixture.detectChanges();
    expect(service.getWatchlist).toHaveBeenCalledWith(false);
    tick();
    fixture.detectChanges();
    expect(component.disableRunBtn).toBeFalsy();
  }));

  it('should disable button, get full stock information, and build report', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    component.onClickRun('Run Report');
    expect(component.disableRunBtn).toBeTruthy();
    expect(service.getWatchlist).toHaveBeenCalledWith(true);
    tick();
    fixture.detectChanges();
    expect(component.disableRunBtn).toBeFalsy();
  }));

  it('should have 3 rows in report after onClickRun', () => {
    fixture.detectChanges();
    // onClickRun will build an array ReportItem(s)
    component.reportItems = reportItems;
    fixture.detectChanges();
    // Using truncate for the description section of the row
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.css('.truncate'));
    expect(elements.length).toEqual(3);
  });
});
