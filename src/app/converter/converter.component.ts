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
  usd: FormControl;
  dealType: FormControl;
  currencyType: FormControl;
  selectedCurrencyObj: CurrencyObject | undefined;

  private subscription?: Subscription;

  readonly  dealTypes = [{
    value: DealTypes. Sell,
  },
  {
    value: DealTypes. Buy,
  }];

  readonly defaultCurrencyObjects: CurrencyObject = 
  {
    ccy: 'USD',
    base_ccy: 'UAH',
    buy: 35,
    sale: 37,
  };


  currencyObjects = [this.defaultCurrencyObjects];

  constructor(
    private ServerCurrencies: CurrencyRateService,
  ) { 
    this.uah = new FormControl(0);
    this.usd = new FormControl(0);
    this.dealType = new FormControl(DealTypes.Sell);
    this.currencyType = new FormControl('USD');
    this.selectedCurrencyObj = this.defaultCurrencyObjects;

    this.uah.touched
    
    this.form = new FormGroup({
      uah: this.uah,
      usd: this.usd,
      dealType: this.dealType,
      currencyType: this.currencyType,
    });
  }

  ngOnInit(): void {
    this.ServerCurrencies.getRate()
      .subscribe((ServerCurrencies) => {
        console.log(`onInit${ServerCurrencies}`)
        this.currencyObjects = ServerCurrencies;
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy = this.currencyType.value)
      })

    // this.subscription = this.form.valueChanges
    // .subscribe((values) => console.log(values))

    this.dealType.valueChanges
      .subscribe(() => this.changeUAH())

    this.currencyType.valueChanges
      .subscribe((value) => {
        console.log(`currType${value}`)
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy = value)
      })
  }

  changeUSD() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.usd.setValue(this.uah.value / rate)
    } 
  }

  changeUAH() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.uah.setValue(this.usd.value * rate)
    }
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
