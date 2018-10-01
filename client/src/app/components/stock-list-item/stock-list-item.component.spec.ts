import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockListItemComponent } from './stock-list-item.component';
import { StockService } from '../../services';
import { getFakeStockService, options } from '../../testing';

describe('StockListItemComponent', () => {
  let component: StockListItemComponent;
  let fixture: ComponentFixture<StockListItemComponent>;
  let service: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockListItemComponent ],
      providers: [
        { provide: StockService, useValue: getFakeStockService() }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListItemComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StockService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize properties with Input() stock', () => {
    component.stock = options[0];
    fixture.detectChanges();
    expect(component.symbol).toEqual('xyz');
    expect(component.name).toEqual('Company XYZ Inc');
    expect(component.price).toEqual(12.25);
    expect(component.change).toEqual(.15);
    expect(component.high).toEqual(12.30);
    expect(component.low).toEqual(12.09);
  });

  it('should add symbol to watchlist and then emmit an event', fakeAsync(() => {
    component.stock = options[0];
    fixture.detectChanges();
    component.onClickAdd('SYMBOL');
    expect(service.addStockToWatchlist).toHaveBeenCalled();
    tick();
    fixture.detectChanges();
    expect(service.getChangeToWatchlistEvent).toHaveBeenCalled();
  }));

  it('should NOT add symbol to watchlist is stock not set', fakeAsync(() => {
    fixture.detectChanges();
    component.onClickAdd('SYMBOL');
    expect(service.addStockToWatchlist).not.toHaveBeenCalled();
  }));
});
