import {Component, inject, signal, Signal} from '@angular/core';
import {AppService} from '../../app.service';
import {Product} from '../../models/product.model';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private service = inject(AppService);
  public products: Signal<Product[] | undefined> = signal<Product []| undefined>(undefined);

  constructor() {
    this.products = toSignal(this.service.getProducts());

  }
  /*
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.products-page = toSignal(this.service.getProducts());
  }*/
}
