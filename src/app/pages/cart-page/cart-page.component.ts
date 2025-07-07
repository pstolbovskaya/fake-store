import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from './services/cart.service';
import {HeaderComponent} from '../main-page/header.component';
import {Product} from '../../models/product.model';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart-page.component.html',
  styleUrl: 'cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    CurrencyPipe
  ]
})

export class CartPageComponent {
  cartService: CartService = inject(CartService);
  protected products = this.cartService.prod;

  decrementItemFromCart(product: Product) {
    this.cartService.decrementProductFromCart(product);
  }

  removeItemFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }

  addItemToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}
