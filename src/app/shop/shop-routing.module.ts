import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import {ProductsComponent, CartComponent, CheckoutComponent, ConfirmationOrderComponent, OrderHistoryComponent, ProductComponent} from '../shop'
import { HomeComponent } from '../home/home.component';

const routes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'cart', component: CartComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'thank-you', component: ConfirmationOrderComponent },
{ path: 'order-history', component: OrderHistoryComponent },
{ path: 'product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
