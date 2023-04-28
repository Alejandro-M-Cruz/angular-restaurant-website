import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CurrentOrderService } from 'src/app/services/current-order.service';

@Component({
  selector: 'app-tip-selector',
  templateUrl: './tip-selector.component.html',
  styleUrls: ['./tip-selector.component.css']
})
export class TipSelectorComponent{
  @Input() control:FormControl;
  constructor() {
  }
}
