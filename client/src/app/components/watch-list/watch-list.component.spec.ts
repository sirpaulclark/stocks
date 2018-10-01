import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StockService } from '../../services';
import { getFakeStockService, eventWatchList } from '../../testing';

import { WatchListComponent } from './watch-list.component';

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;
  let service: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchListComponent ],
      providers: [
        { provide: StockService, useValue: getFakeStockService() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(StockService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get stocks and subscribe to watchlist event on initialization', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.stocks.length).toEqual(0);
    expect(component.disableTrashBtn).toBeTruthy();
    expect(service.getWatchlist).toHaveBeenCalled();
    expect(service.getChangeToWatchlistEvent).toHaveBeenCalled();
    tick();
    fixture.detectChanges();
    expect(component.stocks.length).toBeGreaterThan(0);
    expect(component.disableTrashBtn).toBeFalsy();
  }));

  it('should get stocks when watchlist event emitted', fakeAsync(() => {
    fixture.detectChanges();
    eventWatchList.emit('amd');
    tick();
    fixture.detectChanges();
    expect(service.getWatchlist).toHaveBeenCalled();
  }));

  it('should remove all stocks from watchlist when trash button is clicked', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    component.onClickTrash('Delete All');
    expect(component.stocks.length).toEqual(0);
    expect(component.disableTrashBtn).toBeTruthy();
    expect(service.delStockFromWatchlist).toHaveBeenCalled();
  }));

  it('should unsubscribe for watchliest event when being destroyed', () => {
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(eventWatchList.observers.length).toEqual(0);
  });
});
