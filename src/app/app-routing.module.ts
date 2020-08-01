import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
// const shopModule = () => import('./shop/shop.module').then(x => x.ShopModule);

const routes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
{ path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
// { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
// { path: 'account', loadChildren:() => import('./account/account.module').then(x => x.AccountModule) },
// { path: '', loadChildren: () => import('./shop/shop.module').then(x => x.ShopModule) },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
