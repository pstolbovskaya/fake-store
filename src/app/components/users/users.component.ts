import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {UserService} from './services/user.service';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersComponent {
  userService = inject(UserService);
//  public userList: Signal<User[]> = toSignal(this.userService.getUsers());



}
