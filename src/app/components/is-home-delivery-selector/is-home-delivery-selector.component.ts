import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-is-home-delivery-selector',
  templateUrl: './is-home-delivery-selector.component.html',
  styleUrls: ['./is-home-delivery-selector.component.css']
})
export class IsHomeDeliverySelectorComponent {

  @Input() radioControls:FormControl;
  @Input() textControls:FormControl;
  

}
