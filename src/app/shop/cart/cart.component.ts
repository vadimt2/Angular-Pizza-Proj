import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct, IShipping } from '../../interfaces';
import { CartService, ShippingService, OrderDataService, CurrencyService } from '../../services';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  euro?: number = null;
  products: IProduct[] = [];
  shippings: IShipping[] = [];
  shippingPrice: number = 0;
  shippingSelection: string = '';
  subTotal: number = 0;
  startOrderForm: FormGroup = null;
  selectedCurrency: string = null;
  showCurrencyPrice: boolean = false;

  constructor(private cartService: CartService,
    private shippingService: ShippingService,
    private orderDataService: OrderDataService,
    private router: Router,
    private currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this.products = this.cartService.orders;

    if (this.products.length > 0) {
      this.products.map(product => {
        this.currencyService.currencyChangedString.subscribe((currencyString: string) => {
          this.selectedCurrency = currencyString;

          if (this.currencyService.defualtCurrency !== currencyString) {
            this.currencyService.currencyChangedValue.subscribe((currency: number) => {
              product.currencyPrice = currency * product.price;
              this.euro = currency;
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
          this.euro =  this.currencyService.currencyValue;
        }

        this.shippingService.get().subscribe(data => {
          console.log('shipping',data);
          this.shippings = data;
        });

      });
    }

    this.startOrderForm = new FormGroup({
      note: new FormControl(''),
      shipping: new FormControl('', Validators.required),

    });
  }

  removeFromCart(product) {
    this.cartService.removeQuantityFromCart(product);
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeItem(product) {
    this.cartService.removeItem(product);
  }

  getQuantity(productId) {
    let item = this.products.find(x => x.id == productId);
    item.quantity = this.cartService.getQuantity(productId);
    return item.quantity;
  }

  getSubTotal() {
    return this.cartService.getSubTotal();
  }

  getTotal() {
    return this.cartService.getSubTotal() + parseFloat(this.shippingPrice.toString());
  }

  onItemChange(price) {
    this.shippingPrice = price;
  }

  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); 
    this.shippingSelection = form.value.shipping.title;

    // console.log('Note', form.value.note);
    // console.log('Shipping', form.value.shipping);

    let data = { note: form.value.note, shipping: form.value.shipping }
    this.orderDataService.saveCartInfo(data);
    this.router.navigate(['/checkout'], { state: { data } })
  }
}