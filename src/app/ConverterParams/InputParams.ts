import { CurrencyObject } from "src/typedefs";

export enum Major5 {
  USD = 'USD',
  EUR = 'EUR',
  PLN = 'PLN',
  GBP = 'GBP',
  RUR = 'RUR',
}

export const DefaultCurrencyObject: CurrencyObject = {
  ccy: 'USD',
  base_ccy: 'UAH',
  buy: 1,
  sale: 1,
};

export const getEndpoint = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';