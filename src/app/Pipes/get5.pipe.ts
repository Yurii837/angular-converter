import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyObject } from 'src/typedefs';

import { Major5 } from 'src/ConverterParams/InputParams';

@Pipe({
  name: 'get5'
})
export class Get5Pipe implements PipeTransform {

  transform(currencyObjects: CurrencyObject[],): CurrencyObject[] {
    const major5obj = [];
    if (currencyObjects) {
      for (const key in Major5) {
        const findObj = currencyObjects.find(obj => obj.ccy === key)
      findObj && major5obj.push(findObj)
      }
    }
    return major5obj;
  }
}
