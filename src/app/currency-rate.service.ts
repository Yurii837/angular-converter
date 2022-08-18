import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyObject } from 'src/typedefs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(
    private http: HttpClient,
  ) { }

  getRate(): Observable<CurrencyObject[]> {
    return this.http.get<CurrencyObject[]>('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    .pipe(
      delay(2000),
    )
  }
}
