import {computed, effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Product} from '../../../models/product.model';
import {} from '../../../stores/auth.store.service';
import {cartKey, LocalStorageService} from '../../../stores/local-storage.service';

//export const refreshTokenKey = 'refreshToken';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  localStorageService = inject(LocalStorageService);
  products: WritableSignal<Map<number, { product: Product; count: number }>> = signal(this.loadCartFromLocalStorage());
  prod = computed(() => Array.from(this.products().values()));
  totalCount = computed(() => this.prod().reduce((a, b) => a + b.count, 0));

  constructor() {
    effect(() => {
      console.log(this.products());
      const products = this.products();
      if (products.size) {
        this.localStorageService.setItem(cartKey, products);
      }
    });
  }

  private loadCartFromLocalStorage() {
    const storedCart = this.localStorageService.getItemWithCheck(cartKey) as unknown as Map<number, { product: Product; count: number }>;
    return storedCart ? storedCart : new Map<number, { product: Product, count: number }>();
  }

  addProductToCart(product: Product) {
    this.products.update(prev => {
      let count = prev.get(product.id)?.count;
      if (!count) {
        count = 0;
      }
      prev.set(product.id, {product: product, count: count + 1})

      return new Map(prev);
    });
  }

  clearCart() {
    this.products().clear();
  }

  removeProductFromCart(product: Product) {
    this.products.update(value => {
      let count = value.get(product.id)?.count;
      if (count && count > 1) {
        value.set(product.id, {product, count: count - 1});
      } else {
        value.delete(product.id);
      }

      return new Map(value);
    })
  }
}
