import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent, ProductsComponent, CheckoutComponent, CartComponent, ConfirmationOrderComponent, OrderHistoryComponent} from './index';
import { ShopRoutingModule } from './shop-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { ShopComponent } from './shop.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductComponent,
    ProductsComponent,
    CheckoutComponent,
    CartComponent,
    ConfirmationOrderComponent,
    OrderHistoryComponent,
    HomeComponent,
    SingleItemComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ShopModule { }
