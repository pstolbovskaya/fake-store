import {Injectable} from '@angular/core';
import {Product} from '../models/product.model';

export const refreshTokenKey = 'refreshToken';
export const cartKey = 'cart';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  convertMapToObject(mapToConvert: Map<number, any>): { [key: string]: any } {
    const obj: { [key: string]: any } = {};

    mapToConvert.forEach((value, key) => {
      obj[key.toString()] = value;
    });

    return obj;
  }

  setItem(key: string, val: any) {
    if (val instanceof Map) {
      val = JSON.stringify(this.convertMapToObject(val));
    }
    localStorage.setItem(key, val);
  }

  private getItem(key: string, cache = true) {
    return localStorage.getItem(key);
  }

  objectToMap<TValue>(obj: Record<string, TValue>): Map<string, TValue> {
    return new Map(Object.entries(obj));
  }

  getItemWithCheck(key: string, cache = true) {
    switch (key) {
      case cartKey:
        const val = this.getItem(key);
        if (val) {
          return this.objectToMap<Map<number, { product: Product; count: number }>>(JSON.parse(val));
        }
        return val;
      default:
        return this.getItem(key);
    }
  }

  removeItem(key: string) {
    return localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
