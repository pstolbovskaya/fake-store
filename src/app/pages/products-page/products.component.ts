import {Component, computed, effect, inject, signal, Signal, WritableSignal} from '@angular/core';
import {Product} from '../../models/product.model';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {ProductComponent} from './product-component/product.component';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {ProductService} from './services/product.service';
import {CategoriesComponent} from '../category-subpage/categories.component';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products.component.html',
  imports: [
    ProductComponent,
    PaginatorComponent,
    CategoriesComponent
  ],
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private productService = inject(ProductService);
  public offset: Signal<number> = computed(() => this.currentPageIdx() * this.limit());
  public limit: Signal<number> = signal(10);
  public category: WritableSignal<number | undefined> = signal(undefined);
  public currentPageIdx: WritableSignal<number> = signal(0);
  public products: WritableSignal<Product[]> = signal<Product[]>([]);
  public totalAmount: Signal<Product[] | undefined> = toSignal(this.productService.getAllProducts());
  public activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.productService.getProducts(this.offset(), this.limit(), this.category()).subscribe(products => this.products.set(products));
    });

    effect(() => {
      console.log(this.router);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: this.currentPageIdx() + 1,
          category: this.category(),
        },
        queryParamsHandling: 'merge',
      });
    })

    this.activatedRoute.queryParams.pipe(takeUntilDestroyed()).subscribe((params: Params): void => {
      console.log(params);
      this.currentPageIdx.set(+params['page'] ? +params['page'] - 1 : 0);
      this.category.set(+params['category'] ? +params['category'] : 0);
    });
  }

  ngOnInit() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: this.currentPageIdx() + 1,
        category: this.category(),
      },
      queryParamsHandling: 'merge',
    });
  }

  onCategoryChange(category: number): void {
    // console.log(category);
    this.category.set(category);
    // console.log(this.category());
    //
    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     category: category,
    //   },
    //   queryParamsHandling: 'merge',
    // });
  }

  onPageChanged(newPage: number): void {
    this.currentPageIdx.set(newPage);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: newPage + 1,
        category: this.category(),
      },
      queryParamsHandling: 'merge',
    });
  }

}
