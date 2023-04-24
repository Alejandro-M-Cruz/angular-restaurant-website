import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: User | null = null
  userInfoSubscription?: Subscription

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userInfoSubscription = this.userService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo
    })
  }

  ngOnDestroy() {
    this.userInfoSubscription?.unsubscribe()
  }
}
