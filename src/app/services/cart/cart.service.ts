import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public totalSubject = new Subject()
  //public orderSubject = new Subject()
  orders: IProduct[]; // -> The cart will be changed to OrderDetils !
  totalcartvalue: number;
  constructor() {
    // this.deleteAllLocalSorage();
    if (this.getCartLocalStorage().length > 0) {
      this.orders = this.getCartLocalStorage();
      let totalcartvalueStr = localStorage.getItem("totalcartvalue");
      this.totalcartvalue = JSON.parse(totalcartvalueStr);
      this.sendTotal(this.totalcartvalue);
      console.log(this.orders)
    }
    else {
      this.orders = [];
      this.totalcartvalue = 0;
    }
  }

  sendTotal(totalVal) {
    this.totalSubject.next(totalVal)
  }

 setQuantity(product, quantity){
   if(quantity >= 0){
    let getProduct = this.findItemInCart(product)
    if (getProduct) {
      getProduct.quantity += quantity;
      product.quantity = getProduct.quantity;
      this.totalcartvalue +=product.quantity;
      this.saveCartLocalStorage();
    }
   }
 }


  addToCart(product: IProduct) {
    let getProduct = this.findItemInCart(product)
    if (getProduct) {
      getProduct.quantity += 1;
      product.quantity = getProduct.quantity;
    }
    else {
      product.quantity = 0;
      product.quantity += 1;
      this.orders.push(product);
    }
    this.totalcartvalue += 1;
    this.sendTotal(this.totalcartvalue);
    this.saveCartLocalStorage();
  }

  removeQuantityFromCart(product: IProduct) {
    let getProduct = this.findItemInCart(product);
    if (getProduct) {
      let quantity = getProduct.quantity -= 1;
      product.quantity = quantity;
      if (getProduct.quantity <= 0) {
        this.removeItemFromCart(getProduct);
      }
    }

    this.totalcartvalue -= 1;
    this.saveCartLocalStorage();
    this.removeCartFromLocalStorage();
    console.log(this.getCartLocalStorage())
    this.sendTotal(this.totalcartvalue);
  }

  getQuantity(product) {

    return product.quantity;
  }

  private removeItemFromCart(product) {
    let getProduct = this.findItemInCart(product);
    if (getProduct) {
      let index = this.findItemIndex(product);
      this.orders.splice(index, 1);

      if (this.orders.length > 0) {
        this.saveCartLocalStorage();
      } else {
        this.deleteAllLocalSorage();
      }

      // product.quantity = 0;
    }
  }

  removeItem(product) {
    let getProduct = this.findItemInCart(product);
    if (getProduct) {
      let index = this.findItemIndex(product);
      this.orders.splice(index, 1);
      this.totalcartvalue -= product.quantity;
      this.sendTotal(this.totalcartvalue);
      this.saveCartLocalStorage();
      // product.quantity = 0;
    }
  }

  findItemInCart(product) {
    let getProduct = this.orders.find(item => item.id == product.id);
    return getProduct == null ? null : getProduct;
  }

  private findItemIndex(product) {
    // let getProduct = this.findItemInCart(product);
    let index = this.orders.findIndex(item => item.id == product.id);
    return index == -1 ? -1 : index;
  }

  emprtyCart() {
    this.orders = []
    this.removeCartFromLocalStorage();
  }

  getSubTotal() {
    let total = 0;
    for (let i = 0; i < this.orders.length; i++) {
      total += (this.orders[i].price * this.orders[i].quantity);
    }
    return total;
  }

  private saveCartLocalStorage() {
    let cart = this.orders;
    let cartTosting = JSON.stringify(cart);
    localStorage.setItem("cart", cartTosting);
    localStorage.setItem("totalcartvalue", this.totalcartvalue.toString());
    this.sendTotal(this.totalcartvalue);

  }

  public getCartLocalStorage(): IProduct[] {
    let getCart = localStorage.getItem("cart");
    let conCartToObj = JSON.parse(getCart);
    return conCartToObj == null ? 0 : conCartToObj;
  }

  private removeCartFromLocalStorage() {
    if (this.orders.length === 0) {
      console.log(true);
      localStorage.removeItem("cart");
      localStorage.removeItem("totalcartvalue");
    }

  }

  public deleteAllLocalSorage() {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalcartvalue");
  }
}