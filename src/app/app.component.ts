import { Component } from '@angular/core';
import { getFirestore } from '@firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-restaurant-website';
    store = getFirestore()
}
