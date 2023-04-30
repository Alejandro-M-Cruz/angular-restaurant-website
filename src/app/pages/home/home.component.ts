import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../model/user";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  user: User | null = null
  userSubscription?: Subscription

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.userService.getCurrentUserObservable().subscribe(userInfo => {
      this.user = userInfo
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
