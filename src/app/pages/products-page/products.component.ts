import {Component, computed, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {Product} from '../../models/product.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductComponent} from './product-component/product.component';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products.component.html',
  imports: [
    ProductComponent,
    PaginatorComponent
  ],
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private productService = inject(ProductService);
  public offset: Signal<number> = computed(() => this.currentPageIdx() * this.limit());
  public limit: Signal<number> = signal(10);
  public currentPageIdx: WritableSignal<number> = signal(0);
  public products: WritableSignal<Product[]> = signal<Product[]>([]);
  public totalAmount: Signal<Product[] | undefined> = toSignal(this.productService.getAllProducts());

  constructor() {
    effect(() => {
      this.productService.getProducts(this.offset(), this.limit()).subscribe(products => this.products.set(products));
    });
  }

  onPageChanged(newPage: number): void {
    console.log(newPage);

    //this.offset()
    this.currentPageIdx.set(newPage);

  }

}
