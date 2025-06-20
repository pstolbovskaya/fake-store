import {UserService} from '../../../components/users/services/user.service';
import {inject} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';

export function checkEmailAvailableValidator (
) {
  const userService = inject(UserService);
  return (control: AbstractControl): Observable<null | ValidationErrors> => {
    return userService.isEmailAvailable(control.value).pipe(
      tap((response) => console.log(response)),
      map((response) => {
        return response.isAvailable ? null : { isAvailable: true };
      })
  )};
  }

