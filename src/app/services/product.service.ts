import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../models/product.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);
  //private products$: Observable<Product[]> = new BehaviorSubject<Product[]>([]);
  private productUrl: string = environment.apiUrl+'/products';

  public getProducts(offset: number = 0, limit: number = 10):Observable<Product[]>  {
      return this.http.get<Product[]>(`${this.productUrl}?offset=${offset}&limit=${limit}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}`);
  }

  getProduct(id: number):Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  getProductBySlug(slug: string):Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/slug/${slug}`);
  }

  createProduct(product: {id: number, name: string}): void {
    this.http.post(`${this.productUrl}`, product);
  }

  updateProduct(product: {id: number, name: string}):Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${product.id}`, product);
  }

  deleteProduct(id: number):Observable<boolean> {
    return this.http.delete<boolean>(`${this.productUrl}/${id}`);
  }

  getProductsRelatedBySlug(slug: string):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/slug/${slug}/related`);
  }

  getProductsRelatedById(id: number):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productUrl}/${id}/related`);
  }
}
