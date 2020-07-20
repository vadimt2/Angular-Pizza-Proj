import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, CurrencyService, CartService } from '../../services';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {

  @Input() product:IProduct;
  @Output() rise = new EventEmitter<string>();


  loading = true;
  selectedCurrency: string = null;
  showCurrencyPrice: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService,
    private currencyService: CurrencyService) {
 }

  ngOnInit(): void {
    this.loading = !this.loading;
          this.currencyService.currencyChangedString.subscribe((currencyString: string) => {
            this.selectedCurrency = currencyString;

            if (this.currencyService.defualtCurrency !== currencyString) {
              this.currencyService.currencyChangedValue.subscribe((currency: number) => {
  

                this.product.currencyPrice = currency * this.product.price;
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
            this.product.currencyPrice = this.currencyService.currencyValue * this.product.price;
          }
          this.setProdQuantity(this.product);
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
    this.rise.emit("Thank you");
  }


  removeFromCart(product) {
    this.cartService.removeQuantityFromCart(product);
  }


  getQuantity(product) {
    return this.cartService.getQuantity(product);
  }

}
