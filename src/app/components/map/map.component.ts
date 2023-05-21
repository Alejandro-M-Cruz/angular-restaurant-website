import {Component, OnInit} from '@angular/core';
import {DeliveryAddressService} from "../../services/orders/delivery-address.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private deliveryAddressService: DeliveryAddressService) {}

  ngOnInit() {
    this.deliveryAddressService.initMap()
  }
}
