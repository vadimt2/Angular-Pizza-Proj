import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) { }

  currency: string = null;
  currencyChangedString = new Subject;
  currencyChangedValue = new Subject;
  currencyArray: string[] = [];
  currencyValue: number;
  defualtCurrency: string = null;

  getCourrencies() {
    const currencies = this.currency.toString();
    return this.http.get<any>(`http://apilayer.net/api/live?access_key=f4e8efe67017d6a645e6ea179ebec143&currencies=${currencies}&source=USD&format=1`);
  }

  getCurrency() {
    const currency = this.currency;
    console.log(currency);
    return this.http.get<any>(`http://apilayer.net/api/live?access_key=f4e8efe67017d6a645e6ea179ebec143&currencies=${currency}&source=USD&format=1`).subscribe(data => {
      console.log("getCurrency")
      const getCurrencyObj = data["quotes"];
      const currency = getCurrencyObj[Object.keys(getCurrencyObj)[0]]
      this.setValue(currency);
    });
  }

  getCurrencyAndSource(currency: string, source: string) {
    return this.http.get<any>(`http://apilayer.net/api/live?access_key=f4e8efe67017d6a645e6ea179ebec143&currencies=${currency}&source=${source}&format=1`);
  }

  private sendCurrencyString(currency) {
    this.currencyChangedString.next(currency);
  }

  private sendCurrencyValue(currency) {
    this.currencyChangedValue.next(currency);
  }

  setCurrency(currency) {
    this.currency = currency;
    this.sendCurrencyString(currency);
  }

  setValue(currency) {
    this.currencyValue = currency;
    this.sendCurrencyValue(currency);
  }


}