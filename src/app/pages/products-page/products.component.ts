import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect, ElementRef,
  inject, input, QueryList,
  signal,
  Signal, ViewChild, ViewChildren,
  WritableSignal
} from '@angular/core';
import {Product} from '../../models/product.model';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {ProductComponent} from './product-component/product.component';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {ProductService} from './services/product.service';
import {CategoriesComponent} from '../category-subpage/categories.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HeaderComponent} from '../main-page/header.component';
import {Country, CountryService} from './services/country.service';
import {ArrayFilterPipe} from './pipes/array-filter.pipe';
import {CountryDropdownComponent} from '../../components/app-country-dropdown/app-country-dropdown';

@Component({
  selector: 'app-products-page',
  templateUrl: 'products.component.html',
  imports: [
    ProductComponent,
    PaginatorComponent,
    CategoriesComponent,
    HeaderComponent,
    ArrayFilterPipe,
    CountryDropdownComponent
  ],
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  private countryService = inject(CountryService);

  /*public country: WritableSignal<string> = input('');
  public countries: WritableSignal<Country[]> = this.countryService.getCountries();*/
  constructor() {

    effect(() => {
      this.productService.getProducts(this.offset(), this.limit(), this.category()).subscribe(products => this.products.set(products));
    });

    effect(() => {
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
      this.currentPageIdx.set(+params['page'] ? +params['page'] - 1 : 0);
      this.category.set(+params['category'] ? +params['category'] : undefined);
    });
  }

  onCategoryChange(category: number): void {
    this.category.set(category);
    this.currentPageIdx.set(0);
  }

  onPageChanged(newPage: number): void {
    this.currentPageIdx.set(newPage);
  }

}
