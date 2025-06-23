import {computed, effect, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {TokenResponse} from '../../../models/user.model';
import {Product} from '../../../models/product.model';
import {cartKey} from '../../../stores/auth.store.service';

//export const refreshTokenKey = 'refreshToken';

@Injectable({
  providedIn: 'root',
})

export class CartService {

  products: WritableSignal<Map<number, { product: Product, count: number }>> = signal(this.loadCartFromLocalStorage());
  //products: WritableSignal<{key: number, product: Product, count: number}>= signal(this.loadCartFromLocalStorage());
  prod = computed(() => Array.from(this.products().values()));
  totalCount = computed(() => this.prod().reduce((a, b) => a + b.count, 0));

  constructor() {
    effect(() => {
      console.log(this.products());
      const products = this.products();
      if (products.size) {
        console.log(JSON.stringify(products));
        localStorage.setItem(cartKey, JSON.stringify(this.convertMapToObject(products)));
        console.log(localStorage.getItem(cartKey));
      }
    });
  }

  convertMapToObject(mapToConvert: Map<number, any>): { [key: string]: any } {
    const obj: { [key: string]: any } = {};

    mapToConvert.forEach((value, key) => {
      // Преобразуем числовой ключ Map в строковый ключ объекта
      obj[key.toString()] = value;
    });

    return obj;
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : new Map<number, { product: Product, count: number }>();
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
