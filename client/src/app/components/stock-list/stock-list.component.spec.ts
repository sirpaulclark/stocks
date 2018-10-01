import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { StockListComponent } from './stock-list.component';

import { StockService} from '../../services';
import { getFakeStockService } from '../../testing';

describe('StockListComponent', () => {
  let component: StockListComponent;
  let fixture: ComponentFixture<StockListComponent>;
  let service: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListComponent ],
      providers: [
        { provide: StockService, useValue: getFakeStockService() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(StockListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StockService);

    fixture.detectChanges(); // call ngOnInit()
    tick();                  // wait obserable to complete
    fixture.detectChanges(); // next time slice
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get stocks on creation', () => {
    expect(service.getStockData).toHaveBeenCalled();
    expect(component.stockData.length).toBeGreaterThan(0);
  });

  it('should disable buttons and getStockData when refresh is called', fakeAsync(() => {
    expect(component.stockData.length).toBeGreaterThan(0);
    expect(component.disableBtn).toBeFalsy();
    component.refresh();
    expect(component.stockData.length).toEqual(0);
    expect(component.disableBtn).toBeTruthy();
    tick();
    fixture.detectChanges();
    expect(component.stockData.length).toBeGreaterThan(0);
    expect(component.disableBtn).toBeFalsy();
  }));

  it('should sort options based on price', () => {
    component.sort('num');
    expect(component.stockData[0].optionChain.result[0].quote.symbol).toEqual('xyz');
    component.sort('num');
    expect(component.stockData[0].optionChain.result[0].quote.symbol).toEqual('mno');
  });

  it('should sort options based on symbol', () => {
    component.sort('alpha');
    expect(component.stockData[0].optionChain.result[0].quote.symbol).toEqual('abc');
    component.sort('alpha');
    expect(component.stockData[0].optionChain.result[0].quote.symbol).toEqual('xyz');
  });
});
