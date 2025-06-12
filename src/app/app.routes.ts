import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login-page/login.component';
import {ProductsComponent} from './pages/products-page/products.component';
import {authGuard} from './services/guards/auth.guard.service';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';

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
    path: '**',
    component: NotFoundPageComponent,
    title: 'Not Found',
  },
  /*{
    path: 'products-page/:id',

  },
  {
    path: ''
  }*/
];
