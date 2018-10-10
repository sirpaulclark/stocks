import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { StockService} from '../../services';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        StockService
      ],
      imports: [
        HttpClientModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    stockService = TestBed.get(StockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the getShowStockList to false if Report button is clicked', () => {
    component.clickReport();
    expect(stockService.getShowStockList()).toBeFalsy();
  });

  it('should set the getShowStockList to true if Stocks button is clicked', () => {
    component.clickStocks();
    expect(stockService.getShowStockList()).toBeTruthy();
  });
});
