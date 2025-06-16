import {Product} from '../../../models/product.model';
import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {ProductImageCarouselComponent} from './product-image-carousel/product-image-carousel.component';
import {CategoriesComponent} from '../../category-subpage/categories.component';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    ProductImageCarouselComponent,
    CategoriesComponent
  ]
})

export class ProductComponent {
  @Input() product!: Product ;

}
