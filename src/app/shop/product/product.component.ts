import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyPipe } from '@angular/common';

import { map, catchError } from 'rxjs/operators';
import { FasDirective } from 'angular-bootstrap-md';
import { ProductService, CartService, CurrencyService } from '../../services';
import { IProduct } from '../../interfaces';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: IProduct;
  products: IProduct[] = [];
  id: number;
  quantity: number = 0;
  quantityIncCart : number= 0;
  showCurrencyPrice: boolean = false;
  selectedCurrency: string = "null";


  constructor(private productSevice: ProductService,
     private route: ActivatedRoute,
     private cartService: CartService,
     private currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));


    this.productSevice.getById(this.id).pipe(map((product: IProduct) => {
      this.currencyService.currencyChangedString.subscribe((currencyString: string) => {
        this.selectedCurrency = currencyString;
        if (this.currencyService.defualtCurrency !== currencyString) {
          this.currencyService.currencyChangedValue.subscribe((currency: number) => {
    
            product.currencyPrice = currency * product.price;
            this.showCurrencyPrice = true;

          });
        }
        else {
          this.showCurrencyPrice = false;
        }
      });

      const getOrders = this.cartService.orders;
      if (getOrders.length > 0) {
        const orderItem = getOrders.find(x => x.id == product.id).quantity;
        if (orderItem && orderItem > 0) {
          product.quantity = this.cartService.orders.find(x => x.id == product.id).quantity;
          this.quantityIncCart = product.quantity;
          // console.log(this.quantityIncCart)
        }
      }
      else {
        product.quantity = this.quantity;
      }
      this.selectedCurrency = this.currencyService.currency;
          if(this.selectedCurrency === this.currencyService.defualtCurrency){
                 this.showCurrencyPrice = false;
          }
          else{
            this.showCurrencyPrice = true;
            product.currencyPrice = this.currencyService.currencyValue * product.price;

          }
      this.product = product;

     
      console.log(this.product)
    })).subscribe();
  }

  removeFromCart(product) {
    this.cartService.removeQuantityFromCart(product);
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity(product) {
    return this.cartService.getQuantity(product);
  }

  // setQuantity(product, quantity) {
    // this.cartService.setQuantity(product, quantity);
  // }

}
