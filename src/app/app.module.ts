import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './alert/alert.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from './services/product/product.service';
import { CurrencyPipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CartService } from './services/cart/cart.service';
import { GetCurrencyService } from './services/get-currency/get-currency.service';
import { ShippingService } from './services/shipping/shipping.service';
import { OrderService } from './services/order/order.service';
import { CurrencyService } from './services/currency/currency.service';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AlertService } from './services';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AlertComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [ProductService, CurrencyPipe, CartService, GetCurrencyService, ShippingService,
     OrderService, CurrencyService, AlertService,
      {provide: LocationStrategy, useClass: PathLocationStrategy},
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
