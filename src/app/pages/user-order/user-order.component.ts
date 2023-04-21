import { Component } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.model';


@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {

  constructor() { }

  

  receiveMessage(item:MenuItem){
    console.log(item);
  }

}
