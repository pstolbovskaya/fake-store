import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';

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

  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Пожалуйста, заполните все поля.';
      return;
    }

    this.authService.login(this.credentials).subscribe(result => {
      if (!result) {
        this.errorMessage = 'Неверный логин или пароль.';
      }
    });
  }
}
