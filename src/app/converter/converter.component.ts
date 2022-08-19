import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CurrencyRateService } from '../currency-rate.service';
import { DefaultCurrencyObject } from '../ConverterParams/InputParams';

enum DealTypes {
  Buy = 'Buy',
  Sell = 'Sell',
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit {
  form: FormGroup;
  baseCcyCur: FormControl;
  ccyCur: FormControl;
  dealType: FormControl;
  currencyType: FormControl;

  currencyObjects = [DefaultCurrencyObject];
  selectedCurrencyObj? = DefaultCurrencyObject;

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
    this.baseCcyCur = new FormControl(0);
    this.ccyCur = new FormControl(null);
    this.dealType = new FormControl(DealTypes.Sell);
    this.currencyType = new FormControl(DefaultCurrencyObject.ccy);

    this.baseCcyCur.touched
    
    this.form = new FormGroup({
      baseCcyCur: this.baseCcyCur,
      ccyCur: this.ccyCur,
      dealType: this.dealType,
      currencyType: this.currencyType,
    })
  };

  ngOnInit(): void {
    this.ServerCurrencies.getRate()
      .subscribe((ServerCurrencies) => {
        this.currencyObjects = ServerCurrencies.filter(currencyObj => currencyObj.base_ccy === DefaultCurrencyObject.base_ccy)
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy === this.currencyType.value)
      })

    this.dealType.valueChanges
      .subscribe(() => this.changeBaseCcy())

    this.currencyType.valueChanges
      .subscribe((value) => {
        this.selectedCurrencyObj = this.currencyObjects.find(currencyObj => currencyObj.ccy === value)
        this.changeBaseCcy()
      })
  };

  changeBaseCcy() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.baseCcyCur.setValue(+(this.ccyCur.value * rate).toFixed(3))
    } 
  };

  changeCcy() {
    if(this.selectedCurrencyObj) {
      const rate = this.dealType.value === DealTypes.Sell
      ? this.selectedCurrencyObj.buy
      : this.selectedCurrencyObj.sale
    this.ccyCur.setValue(+(this.baseCcyCur.value / rate).toFixed(3))
    }
  };
};
