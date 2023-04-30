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
  user: User | null = null
  userSubscription?: Subscription
  userIsAdmin:boolean;
  isAdminSubscription?:Subscription;


  constructor(private readonly userService: UserService, private permissionsService:PermissionsService) {}

  ngOnInit() {
    this.userSubscription = this.userService.getCurrentUserObservable().subscribe(userInfo => {
      this.user = userInfo
    })
    this.isAdminSubscription = this.permissionsService.isAdmin().subscribe(isAdmin => this.userIsAdmin = isAdmin);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
    this.isAdminSubscription?.unsubscribe();
  }
}
