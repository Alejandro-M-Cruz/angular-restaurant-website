import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentOrderService } from 'src/app/services/current-order.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})

export class SuccessComponent implements OnInit {
  constructor(private router: Router, private order:CurrentOrderService) { }


  ngOnInit(): void {
    this.order.confirmOrder();
  }



  redirectToUserOrder(){
    this.router.navigate(['/user-order']);
  }

}
