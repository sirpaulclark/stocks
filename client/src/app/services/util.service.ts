import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  public compareNumbers(a: number, b: number, decendingOrder: boolean = true): number {
    return (a - b) * (decendingOrder ? 1 : -1);
  }

  public compareStrings(a: string, b: string, decendingOrder: boolean = true): number {
    return this.compareStringsHelper(a, b) * (decendingOrder ? 1 : -1);
  }

  private compareStringsHelper(a: string, b: string): number {
    if (a < b) { return - 1; }
    if (a > b) { return 1; }
    return 0;
  }
}
