import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CartService} from '../../stores/cart.service';
import {HeaderComponent} from '../main-page/header.component';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart-page.component.html',
  styleUrl: 'cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent
  ]
})

export class CartPageComponent {
  cartService: CartService = inject(CartService);
  protected products = this.cartService.products;

}
