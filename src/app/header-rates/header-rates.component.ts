import { Component, OnInit } from '@angular/core';
import { CurrencyObject } from 'src/typedefs';
import { CurrencyRateService } from '../currency-rate.service';

@Component({
  selector: 'app-header-rates',
  templateUrl: './header-rates.component.html',
  styleUrls: ['./header-rates.component.scss']
})
export class HeaderRatesComponent implements OnInit {
  currencyObjects?: CurrencyObject[];

  constructor(
    private ServerCurrencies: CurrencyRateService,
  ) { 
    this.currencyObjects;
  }

  ngOnInit(): void {
    this.ServerCurrencies.getRate()
      .subscribe((ServerCurrencies) => {
        this.currencyObjects = ServerCurrencies.filter(currencyObj => currencyObj.base_ccy === 'UAH');
      })
  };

  reloadRates() {
    this.ServerCurrencies.getRate()
      .subscribe((ServerCurrencies) => {
        this.currencyObjects = ServerCurrencies.filter(currencyObj => currencyObj.base_ccy === 'UAH');
      })
  };
}
