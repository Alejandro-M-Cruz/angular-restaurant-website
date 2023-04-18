import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../model/user-info.model";
import {first} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: UserInfo | null = null

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo
    })
  }
}
