import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IOrder } from 'src/app/interfaces';

@Component({
  selector: 'app-confirmation-order',
  templateUrl: './confirmation-order.component.html',
  styleUrls: ['./confirmation-order.component.scss']
})
export class ConfirmationOrderComponent implements OnInit {
  getCartInfo:any = null;
  order:IOrder = null;  

  constructor( private currency:CurrencyPipe) { }

  ngOnInit(): void {
    this.getCartInfo = history.state.data;
    this.order = this.getCartInfo.data;
    console.log(this.getCartInfo.data.confirmationNumber);
  

  }

}
