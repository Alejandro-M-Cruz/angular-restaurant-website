import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {map, Observable} from "rxjs";
import { PermissionsService } from 'src/app/services/user/permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentUserUsername$: Observable<string | null> = this.userService.currentUser$
    .pipe(map(user => user?.username ?? null))
  currentUserIsAdmin$: Observable<boolean> = this.permissionsService.isAdmin()

  constructor(private readonly userService: UserService, private permissionsService:PermissionsService) {}

}
