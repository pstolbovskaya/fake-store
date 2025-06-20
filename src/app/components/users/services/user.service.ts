import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http  = inject(HttpClient);
  userApi = environment.apiUrl+'/users';

  getUsers() {
    return this.http.get<Observable<User[]>>(this.userApi);
  }

  getSingleUser(id: number) {
    return this.http.get(this.userApi + '/' + id);
  }

  createUser(name: string, email:string, password:string, avatar?:string) {
    return this.http.post(this.userApi, {name, email, password, avatar});
  }

  updateUser(id: number, email: string, name: string) {
    return this.http.put(this.userApi + '/' + id, {email, name});
  }

  isEmailAvailable(email: string) {
    return this.http.post<AvailableEmail>('https://api.escuelajs.co/api/v1/users/is-available', {email});
  }
}

interface AvailableEmail {
  isAvailable: boolean;
}
