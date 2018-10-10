import { Pipe, PipeTransform } from '@angular/core';
import { YOptionData } from '../models';

const OPTIONTYPE = 'option';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filterString: string, valueType?: string): any {
    if (!Array.isArray(values)) {
      return values;
    }
    if (filterString && filterString.length > 0) {
      const lwrFilterString = filterString.toLowerCase();
      if (valueType && valueType.toLowerCase() === OPTIONTYPE) {
        let symbol: string;
        let name: string;
        return values.filter((value: YOptionData) => {
          symbol = value.optionChain.result[0].underlyingSymbol.toLowerCase();
          name = value.optionChain.result[0].quote.longName.toLowerCase();
          return symbol.includes(lwrFilterString) || name.includes(lwrFilterString);
        });
      }
      return values.filter((value: string) => {
        return value.toLowerCase().includes(lwrFilterString);
      });
    }
    return values;
  }
}
