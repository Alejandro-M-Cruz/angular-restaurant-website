import { Component, Input } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent {
  @Input() username?: Observable<string | null>;

  images: string[] = [
    "../../assets/images/carousel/restaurante-1.jpg",
    "../../assets/images/carousel/restaurante-2.jpg",
    "../../assets/images/carousel/restaurante-3.jpg",
    "../../assets/images/carousel/restaurante-4.jpg",
    "../../assets/images/carousel/restaurante-5.jpg",
  ]
}
