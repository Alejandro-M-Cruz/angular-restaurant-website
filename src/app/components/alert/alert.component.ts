import {Component, Input, OnInit} from '@angular/core';

export interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() type: string = 'success'
  @Input() message: string = ''
  @Input() show = false
}
