import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommentStmt } from '@angular/compiler';
import { IProduct } from '../../interfaces';
import { ProductService, CartService, CurrencyService } from '../../services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] = []
  selectedCurrency: string = null;
  showCurrencyPrice: boolean = false;
  loading = true;

  constructor(private productService: ProductService, private cartService: CartService,
     private currencyService: CurrencyService) {
  }
  //
  ngOnInit(): void {
    this.productService.get().subscribe((products: IProduct[]) => {
      this.products = products;
      this.loading = !this.loading;
      if (products.length > 0) {
        this.products.map(product => {
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
          this.selectedCurrency = this.currencyService.currency;
          if(this.selectedCurrency === this.currencyService.defualtCurrency){
            this.showCurrencyPrice = false;
          }
          else{
            this.showCurrencyPrice = true;
            product.currencyPrice = this.currencyService.currencyValue * product.price;
          }
          this.setProdQuantity(product);
        });
      }
    });
  }

  setProdQuantity(product) {
    if (this.cartService.orders.length > 0) {
      let itemInOrder = this.cartService.orders.find(order => order.id == product.id);
      if (itemInOrder) {
        product.quantity = itemInOrder.quantity;
      }
    }
  }



  addToCart(product) {
    this.cartService.addToCart(product);
  }


  removeFromCart(product) {
    this.cartService.removeQuantityFromCart(product);
  }


  getQuantity(product) {
    return this.cartService.getQuantity(product);
  }

  onRise(rise:string){
      console.log(rise);
  }


}
