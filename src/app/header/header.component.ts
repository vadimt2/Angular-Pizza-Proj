import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CurrencyService } from '../services/currency/currency.service';
import { AccountService } from '../services';
import { IUser } from '../interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartProductCount:number;
  selectedCurrency:string;
  currencies:string[] = ["USD", "EUR","ILS"];
  defaultCurrency:string = "USD";
  user:IUser = null;


  constructor(private cartService:CartService,
    private currencyService:CurrencyService,
    private accountService:AccountService) { }

  
  ngOnInit(): void {
    this.currencyService.defualtCurrency = this.defaultCurrency;
    this.currencyService.setCurrency(this.defaultCurrency);
    this.accountService.user.subscribe(user => {
      this.user = user;
    })

    this.cartProductCount = 0;
    if(this.cartService.totalcartvalue > 0){
      this.cartProductCount = this.cartService.totalcartvalue;
    }
    this.cartService.totalSubject.subscribe((totalvalue : number)=>{


        this.cartProductCount = totalvalue;
    })
  }

  onLogout(){
  this.accountService.logout();
  }

  onChange(currency:string){
    this.currencyService.setCurrency(currency);
    if(this.defaultCurrency !== currency){
      this.currencyService.getCurrency();
    }
  }
}


