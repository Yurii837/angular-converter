import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyObject } from 'src/typedefs';
import { getEndpoint } from './ConverterParams/InputParams';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRateService {

  constructor(
    private http: HttpClient,
  ) { }

  getRate(): Observable<CurrencyObject[]> {
    return this.http.get<CurrencyObject[]>(getEndpoint)
    .pipe(
      delay(500),
    )
  }
}
