import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {CategoryComponent} from './component/category/category.component';
import {CustomerComponent} from './component/customer/customer.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SpeciesComponent} from './component/species/species.component';
import {ShopComponent} from './component/shop/shop.component';

import { ProductInfoComponent } from './component/product-info/product-info.component';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { ServiceDetailsComponent } from './component/admin/service-details/service-details.component';
import { ProductDetailsComponent } from './component/admin/product-details/product-details.component';
import { OrderDetailsComponent } from './component/admin/order-details/order-details.component';
import {AboutUsComponent} from "./component/about-us/about-us.component";



import {ProductInfoComponent} from './component/product-info/product-info.component';
import {ShoppingCartComponent} from "./component/shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {LayoutComponent} from "./component/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'customers', component: CustomerComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'species', component: SpeciesComponent},
      {path: 'product/:id', component: ProductInfoComponent},
      {path: 'shop', component: ShopComponent},
      {path: 'cart', component: ShoppingCartComponent},
      {path: 'checkout', component: CheckoutComponent},
    ]
  },
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
