import {Product} from '../../../models/product.model';
import {ChangeDetectionStrategy, Component, input, Input} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {ProductImageCarouselComponent} from './product-image-carousel/product-image-carousel.component';
import {CategoriesComponent} from '../../category-subpage/categories.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
  imports: [
    CurrencyPipe,
    ProductImageCarouselComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent {
  product = input.required<Product>();
}
