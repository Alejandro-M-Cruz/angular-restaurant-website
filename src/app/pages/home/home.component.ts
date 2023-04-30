import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../model/user";
import {first, Subscription} from "rxjs";
import { PermissionsService } from 'src/app/services/user/permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: User | null = null;
  userInfoSubscription?: Subscription;
  userIsAdmin:boolean;


  constructor(private readonly userService: UserService, private permissionsService:PermissionsService) {}

  ngOnInit() {
    this.userInfoSubscription = this.userService.getCurrentUserObservable().subscribe(userInfo => {
      this.userInfo = userInfo
    })
    this.permissionsService.isAdmin().subscribe(isAdmin => this.userIsAdmin = isAdmin);
  }

  ngOnDestroy() {
    this.userInfoSubscription?.unsubscribe()
  }
}
