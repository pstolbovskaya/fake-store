import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  private http: HttpClient = inject(HttpClient);
  private categoryUrl: string = environment.apiUrl+'/categories';

  getCategories(){
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoruById(id:number){
    return this.http.get<Category>(this.categoryUrl+`/${id}`);
  }

  createCategory(category:Category){
    return this.http.post<Category>(this.categoryUrl+`/`, category);
  }

  getProductsByCategory(categoryId:number){
    return this.http.get<Product[]>(this.categoryUrl+`/${categoryId}/products`);
  }

  deleteCategory(categoryId:number){
    return this.http.delete<boolean>(this.categoryUrl+`/${categoryId}`);
  }

  updateCategory(id: number, category:Category){
    return this.http.put<Category>(this.categoryUrl+`/${id}`, category);
  }

  getCategoryBySlug(slug:number){
    return this.http.get<Category>(this.categoryUrl+`/slug/${slug}`);
  }
}
