import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [
    FormsModule
  ]
})

export class LoginComponent {
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor() {
    console.log(new Date(new Date().getTime() + 1749765652));
  }

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Пожалуйста, заполните все поля.';
      return;
    }

    this.authService.login(this.credentials).subscribe(result => {
      if (!result) {
        this.errorMessage = 'Неверный логин или пароль.';
      }
      this.router.navigate(['products']);
    });
  }
}
