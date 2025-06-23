import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {AuthStoreService} from '../../stores/auth.store.service';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../cart-page/services/cart.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
  imports: [
    RouterLink
  ]
})

export class HeaderComponent {
  private router: Router = inject(Router);
  private authStoreService = inject(AuthStoreService);
  protected readonly authenticate = this.authStoreService.isAuthenticated;
  cartService: CartService = inject(CartService);
  productsCount = computed( () => this.cartService.totalCount());

  logOut(): void {
    this.authStoreService.onLogout();
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
