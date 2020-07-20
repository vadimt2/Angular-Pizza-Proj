import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(private http: HttpClient) { }

  mapToEuroPrice(array){
    return this.http.get<any>(`http://apilayer.net/api/live?access_key=f4e8efe67017d6a645e6ea179ebec143&currencies=EUR,GBP,CAD,PLN&source=USD&format=1`).subscribe(data => {
      array.map(item => {
        item.priceInEuro = data.quotes.USDEUR * item.price;
        console.log("times");
      })
      return data;
    });
  }

  getEuroCurr(){
    return this.http.get<any>(`http://apilayer.net/api/live?access_key=f4e8efe67017d6a645e6ea179ebec143&currencies=EUR&source=USD&format=1`);
  }

}
