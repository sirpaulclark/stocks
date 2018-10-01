import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockService } from '../../services';
import { getFakeStockService, stocks } from '../../testing';
import { WatchListItemComponent } from './watch-list-item.component';

describe('WatchListItemComponent', () => {
  let component: WatchListItemComponent;
  let fixture: ComponentFixture<WatchListItemComponent>;
  let service: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchListItemComponent ],
      providers: [
        { provide: StockService, useValue: getFakeStockService() }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListItemComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StockService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize properties with Input() stock', () => {
    component.stock = stocks[0];
    fixture.detectChanges();
    expect(component.symbol).toEqual('xyz');
  });

  it('should delete symbol from watchlist and then emmit an event ', fakeAsync(() => {
    component.stock = stocks[0];
    fixture.detectChanges();
    component.onClickRem('SYMBOL');
    expect(service.delStockFromWatchlist).toHaveBeenCalled();
    tick();
    fixture.detectChanges();
    expect(service.getChangeToWatchlistEvent).toHaveBeenCalled();
  }));

  it('should NOT delete symbol from watchlist if stock not set', fakeAsync(() => {
    fixture.detectChanges();
    component.onClickRem('SYMBOL');
    expect(service.delStockFromWatchlist).not.toHaveBeenCalled();
  }));
});
