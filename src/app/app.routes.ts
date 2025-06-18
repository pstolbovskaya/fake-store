import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login-page/login.component';
import {ProductsComponent} from './pages/products-page/products.component';
import {authGuard} from './services/guards/auth.guard.service';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {CartPageComponent} from './pages/cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    component: CartPageComponent,

  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Not Found',
  },
];
