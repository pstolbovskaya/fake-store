import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login-page/login.component';
import {ProductsComponent} from './pages/products-page/products.component';
import {authGuard} from './services/guards/auth.guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authGuard]
  },
  /*{
    path: 'products-page/:id',

  },
  {
    path: ''
  }*/
];
