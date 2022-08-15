import { Component, OnInit } from '@angular/core';

enum DealTypes {
  Buy = 'Buy',
  Sell = 'Sell',
}

interface CurrencyObject {
  ccy: string,
  base_ccy: string,
  bye: number,
  sale: number,
}


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit {
  dealTypes = [{
    value: DealTypes. Sell,
  },
  {
    value: DealTypes. Buy,
  }];

  defaultCurrencyObjects: CurrencyObject = 
  {
    ccy: 'USD',
    base_ccy: 'UAH',
    bye: 35,
    sale: 35,
  };


  currencyOobjects = [this.defaultCurrencyObjects];

  constructor() { }

  ngOnInit(): void {
  }

}
