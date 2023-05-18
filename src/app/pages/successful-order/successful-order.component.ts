import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SenderEmailService } from 'src/app/services/email-services/sender-email-service.service';
import { UserService } from 'src/app/services/user/user.service';
import {OrdersService} from "../../services/orders/orders.service";


@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css']
})

export class SuccessfulOrderComponent implements OnInit {
  constructor(
    private router: Router,
    private emailService:SenderEmailService,
    private user: UserService,
    private readonly ordersService: OrdersService,

    ) { }

  ngOnInit(): void {

    this.user.currentUser$.subscribe((user) => {
      console.log(user);

      if(user){
        this.ordersService.getAllUserOrders(user).subscribe((order) => {
          if(order) this.emailService.sendMessage("order",order[0],user);
        })
      }
    })

  }

  async redirectToUserOrder() {
    await this.router.navigate(['/user-order']);
  }

  async redirectToUserOrdersHistory() {
    await this.router.navigate(['/user-order-history']);
  }

}
