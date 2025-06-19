import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../components/users/services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  credentials = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage = '';

  onSubmit(): void {

    if (!this.userService.isEmailAvailable(this.credentials.email)) {
      this.errorMessage = 'Такой пользователь уже существует';
      return;
    }

    if (
      !this.credentials.email ||
      !this.credentials.password ||
      !this.credentials.confirmPassword
    ) {
      this.errorMessage = 'Пожалуйста, заполните все поля.';
      return;
    }

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }

      this.userService.createUser("test", this.credentials.email, this.credentials.password).subscribe(result => {
        if (!result) {
          this.errorMessage = 'Что-то пошло не так :(';
        }
        this.router.navigate(['login']);
      })

  }
}
