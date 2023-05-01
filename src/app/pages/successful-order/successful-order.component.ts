import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-order',
  templateUrl: './successful-order.component.html',
  styleUrls: ['./successful-order.component.css']
})

export class SuccessfulOrderComponent {
  constructor(private router: Router) { }

  async redirectToUserOrder() {
    await this.router.navigate(['/user-order']);
  }

  async redirectToUserOrdersHistory() {
    await this.router.navigate(['/user-order-history']);
  }

}
