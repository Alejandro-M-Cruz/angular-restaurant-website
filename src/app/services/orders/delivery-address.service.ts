import {Injectable} from '@angular/core';
import * as leaflet from "leaflet";
import {Address} from "../../model/order.model";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {ValidationErrors, ValidatorFn} from "@angular/forms";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {
  map: leaflet.Map
  restaurantLocation = leaflet.latLng(
    Address.RESTAURANT_LOCATION.latitude,
    Address.RESTAURANT_LOCATION.longitude
  )
  deliveryLocationMarker: leaflet.Marker | null = null

  constructor(private http: HttpClient) {}

  initMap() {
    this.map = leaflet.map('map').setView(this.restaurantLocation, 11);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map)
    this.configureMarker()
    this.addMarkerAndCircleAroundRestaurantLocation()
  }

  private addMarkerAndCircleAroundRestaurantLocation() {
    leaflet.marker(this.restaurantLocation).addTo(this.map)
    leaflet.circle(
      this.restaurantLocation,
      {radius: Address.MAX_DISTANCE_TO_RESTAURANT_IN_METERS}
    ).addTo(this.map)
  }

  getDeliveryAddressDistanceToRestaurant(deliveryAddress: Address) {
    let { street, streetNumber, city } = deliveryAddress
    const deliveryLocationUrl =
      'https://nominatim.openstreetmap.org/search?q=' + street +'+'+ streetNumber +'+'+ city +' &format=json'
    return this.http.get(deliveryLocationUrl).pipe(map((response: any) => {
      if (response.length === 0)
        return null
      const deliveryLocation = leaflet.latLng( response[0].lat, response[0].lon)
      this.placeDeliveryLocationMarker(deliveryLocation)
      return this.restaurantLocation.distanceTo(deliveryLocation)
    }))
  }

  private clearDeliveryLocationMarker() {
    this.deliveryLocationMarker?.remove()
    this.deliveryLocationMarker = null
  }

  private placeDeliveryLocationMarker(deliveryLocation: leaflet.LatLng) {
    this.clearDeliveryLocationMarker()
    this.deliveryLocationMarker = leaflet.marker(deliveryLocation)
    this.deliveryLocationMarker.addTo(this.map)
  }

  deliveryAddressValidator: ValidatorFn = (control): Observable<ValidationErrors | null> => {
    return this.getDeliveryAddressDistanceToRestaurant(control.value! as Address).pipe(
      map(distance => {
        if (!distance) {
          this.clearDeliveryLocationMarker()
          return {unknownAddress: true}
        }
        return distance > Address.MAX_DISTANCE_TO_RESTAURANT_IN_METERS ? {tooFarFromRestaurant: true} : null
      })
    )
  }

  private configureMarker() {
    const iconRetinaUrl = '/assets/map/marker/marker-icon-2x.png'
    const iconUrl = '/assets/map/marker/marker-icon.png'
    const shadowUrl = '/assets/map/marker/marker-shadow.png'
    leaflet.Marker.prototype.options.icon = leaflet.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    })
  }
}
