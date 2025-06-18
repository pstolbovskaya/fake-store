import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {TokenResponse} from '../models/user.model';
import {Product} from '../models/product.model';

//export const refreshTokenKey = 'refreshToken';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  products: Signal<Product[]> = signal([]);

  addProductToCart(product: Product) {
    this.products().push(product);
  }

  clearCart() {
    this.products().length = 0;
  }
}
