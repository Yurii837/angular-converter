import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyRateService } from '../currency-rate.service';
import { CurrencyObject } from 'src/typedefs';

enum DealTypes {
  Buy = 'Buy',
  Sell = 'Sell',
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  uah: FormControl;
  ccyCur: FormControl;
  dealType: FormControl;
  currencyType: FormControl;
  selectedCurrencyObj?: CurrencyObject;

  readonly defaultCurrencyObjects: CurrencyObject = 
  {
    ccy: 'USD',
    base_ccy: 'UAH',
    buy: 1,
    sale: 1,
  };

  currencyObjects = [this.defaultCurrencyObjects];

  private subscription?: Subscription;

  readonly  dealTypes = [{
      value: DealTypes. Sell,
    },
    {
      value: DealTypes. Buy,
    }
  ];

 
  constructor(
    private ServerCurrencies: CurrencyRateService,
  ) { 
    this.uah = new FormControl(0);
    this.ccyCur = new FormControl(null);
    this.dealType = new FormControl(DealTypes.Sell);
    this.currencyType = new FormControl('USD');
    this.selectedCurrencyObj = this.defaultCurrencyObjects;

    this.uah.touched
    
    this.form = new FormGroup({
      uah: this.uah,
      ccyCur: this.ccyCur,
      dealType: this.dealType,
      currencyType: this.currencyType,
    })
  };

  ngOnInit(): void {
    this.ServerCurrencies.getRate()
      .subscribe((ServerCurrencies) => {
        this.currencyObjects = ServerCurrencies.filter(currencyObj => currencyObj.base_ccy === 'UAH');
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy === this.currencyType.value)
      })

    this.dealType.valueChanges
      .subscribe(() => this.changeUAH())

    this.currencyType.valueChanges
      .subscribe((value) => {
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy === value);
        this.changeUAH();
      })
  };

  changeUSD() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.ccyCur.setValue(+(this.uah.value / rate).toFixed(3))
    } 
  };

  changeUAH() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.uah.setValue(+(this.ccyCur.value * rate).toFixed(3))
    }
  };
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  };
};
