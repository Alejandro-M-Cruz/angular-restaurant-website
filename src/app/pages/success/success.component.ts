import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentOrderService } from 'src/app/services/orders/current-order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent {
  constructor(private router: Router, private order:CurrentOrderService) { }



  redirectToUserOrder(){
    this.router.navigate(['/user-order']);
  }

}
