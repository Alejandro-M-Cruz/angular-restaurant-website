import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-is-home-delivery-selector',
  templateUrl: './is-home-delivery-selector.component.html',
  styleUrls: ['./is-home-delivery-selector.component.css']
})
export class IsHomeDeliverySelectorComponent {

  @Input() radioControls:FormControl;
  @Input() textControls:FormControl;
  @Output() radioControlsChange = new EventEmitter<FormControl>();

  onHomeDeliverySelected(){
    this.radioControlsChange.emit(this.radioControls.value);
  }

}
