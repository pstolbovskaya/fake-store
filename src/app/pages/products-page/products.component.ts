import {Component, inject, signal, Signal} from '@angular/core';
import {AppService} from '../../app.service';
import {Product} from '../../models/product.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductComponent} from './product-component/product.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  imports: [
    ProductComponent
  ],
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private service = inject(AppService);
  public products: Signal<Product[] | undefined> = signal<Product []| undefined>(undefined);

  constructor() {
    this.products = toSignal(this.service.getProducts());

  }

  /*getProducts() {
    this.products-page = toSignal(this.service.getProducts());
  }*/
}
