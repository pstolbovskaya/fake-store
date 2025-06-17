import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthStoreService} from '../../stores/auth.store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  private router: Router = inject(Router);
  private authStoreService = inject(AuthStoreService);
  protected readonly authenticate = this.authStoreService.isAuthenticated;

  logOut(): void {
    this.authStoreService.onLogout();
    this.router.navigate(['/']);
  }
}
