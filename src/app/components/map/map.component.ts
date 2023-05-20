import {Component, Input} from '@angular/core';
import * as leaflet from 'leaflet'
import {HttpClient} from "@angular/common/http";
import {Address} from "../../model/order.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input() userAddress?: Address
  map!: leaflet.Map;
  Restaurant = leaflet.latLng(Address.RESTAURANT_LOCATION[0], Address.RESTAURANT_LOCATION[1]);
  userDistance: number = 0;
  userMarker!: leaflet.Marker;

  deliveryDistance: number = 0;
  deliveryMarker!: leaflet.Marker;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {

    // Inicializa el mapa
    this.map = leaflet.map('map').setView(this.Restaurant, 12);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    let marker, circle

    // Añadir punto y area al mapa
    marker = leaflet.marker(this.Restaurant).addTo(this.map)
    circle = leaflet.circle(this.Restaurant, {radius: 5000}).addTo(this.map)

    // Obtiene la geolocalización del cliente
    navigator.geolocation.watchPosition((position) => this.getUserDistance(position));

    // Obtiene los datos del cliente para el envío del pedido

  }

  onSubmit() {
    if (!this.userAddress)
      return

    let { street, streetNumber, city } = this.userAddress

    // URL con la dirección de envío
    const locationurl = ('https://nominatim.openstreetmap.org/search?q=' + street +'+'+ streetNumber +'+'+ city +' &format=json');

    // Servicio de Http para obtener datos
    this.http.get(locationurl).subscribe((data: any) => {

      if (data.length > 0) {
        let latitude = data[0].lat;
        let longitude = data[0].lon;

        // Mediante el punto obtenemos la distancia y marcamos en el mapa
        var deliveryLocation = leaflet.latLng(latitude, longitude)
        this.deliveryDistance = Number((this.Restaurant.distanceTo(deliveryLocation)).toFixed(0))
        leaflet.marker(deliveryLocation).addTo(this.map)

      } else {
        console.log('No se encontraron resultados');
      }
    })
  }

  getUserDistance(position: GeolocationPosition){

    const userLocation = leaflet.latLng(position.coords.latitude, position.coords.longitude)
    this.userDistance = Math.round(this.Restaurant.distanceTo(userLocation))
    this.userMarker = leaflet.marker(userLocation).addTo(this.map)

  }
}
