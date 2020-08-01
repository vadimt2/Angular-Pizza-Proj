import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent, 
    LayoutComponent,
    LoginComponent,
    RegisterComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    FormsModule,
  ]
})
export class AccountModule { }
