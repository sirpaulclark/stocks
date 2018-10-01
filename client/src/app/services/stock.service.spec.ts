import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { options, stocks } from '../testing';

import { StockService, urlStock, urlWatchlist } from './stock.service';

describe('StockService', () => {
  let injector: TestBed;
  let service: StockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockService],
      imports: [HttpClientTestingModule]
    });

    injector = getTestBed();
    service = injector.get(StockService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStockData() should create HttpParam "refresh" when passed true', () => {
    service.getStockData(true).subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(options);
    });

    const req = httpMock.expectOne(`${urlStock}?refresh=true`);
    expect(req.request.method).toBe('GET');
    req.flush(options);
  });

  it('getWatchlist() should create HttpParam "full" when passed true', () => {
    service.getWatchlist(true).subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(stocks);
    });

    const req = httpMock.expectOne(`${urlWatchlist}?full=true`);
    expect(req.request.method).toBe('GET');
    req.flush(stocks);
  });

  it('addStockToWatchlist() should handle an error', () => {
    spyOn(console, 'error');
    service.addStockToWatchlist('xyz').subscribe(() => {});

    const req = httpMock.expectOne(`${urlWatchlist}`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Duplicate Stock'), {
      status: 409,
      statusText: 'Conflict'
    });
    expect(console.error).toHaveBeenCalled();
  });

});
