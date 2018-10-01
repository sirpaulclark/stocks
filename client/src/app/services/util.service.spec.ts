import { TestBed, inject } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilService]
    });
  });

  it('should be created', inject([UtilService], (service: UtilService) => {
    expect(service).toBeTruthy();
  }));

  describe('Compare methods', () => {
    it('should return a negative number when compareNumbers is pasted 10 & 20',
      inject([UtilService], (utilService: UtilService) => {
        expect(utilService.compareNumbers(10, 20)).toBeLessThanOrEqual(0);
    }));

    it('should return a positive number when compareNumbers is pasted 10 & 20 and decendingOrder is false',
      inject([UtilService], (utilService: UtilService) => {
        expect(utilService.compareNumbers(10, 20, false)).toBeGreaterThanOrEqual(0);
    }));

    it('should return a negative number when compareStrings is pasted "a" & "b"',
      inject([UtilService], (utilService: UtilService) => {
        expect(utilService.compareStrings('a', 'b')).toBeLessThanOrEqual(0);
    }));

    it('should return a positive number when compareStrings is pasted "a" & "b" and decendingOrder is false',
      inject([UtilService], (utilService: UtilService) => {
        expect(utilService.compareStrings('a', 'b', false)).toBeGreaterThanOrEqual(0);
    }));
  });
});
