import {ChangeDetectionStrategy, Component, inject, input, Signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductService} from '../products-page/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: "product-details",
  templateUrl: "product-details.component.html",
  styleUrls: ["product-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe
  ]
})

export class ProductDetailsComponent {
  productService: ProductService = inject(ProductService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  product = toSignal(this.productService.getProduct(this.activatedRoute.snapshot.params['id']));

}
