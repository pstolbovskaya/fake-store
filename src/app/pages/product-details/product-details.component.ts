import {ChangeDetectionStrategy, Component, inject, input, output, Signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {CurrencyPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {ProductService} from '../products-page/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../../stores/cart.service';
import {HeaderComponent} from '../main-page/header.component';

@Component({
  selector: "product-details",
  templateUrl: "product-details.component.html",
  styleUrls: ["product-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    HeaderComponent
  ]
})

export class ProductDetailsComponent {
  productService: ProductService = inject(ProductService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  product = toSignal(this.productService.getProduct(this.activatedRoute.snapshot.params['id']));
  cartService: CartService = inject(CartService);

  addToCart() {
    this.cartService.addProductToCart(this.product()!);
  }

}
