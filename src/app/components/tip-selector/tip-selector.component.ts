import { Component, Input, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Order} from "../../model/order.model";

@Component({
  selector: 'app-tip-selector',
  templateUrl: './tip-selector.component.html',
  styleUrls: ['./tip-selector.component.css']
})
export class TipSelectorComponent implements OnInit {
  tipOptions = Order.TIP_OPTIONS;
  customTipFormControl = new FormControl<number>(
    0,
    [Validators.min(0), Validators.max(Order.MAX_TIP)]
  );
  @Input() tipFormControl: FormControl;

  ngOnInit() {
    this.customTipFormControl.disable()
  }

  onCustomTipOptionSelected() {
    this.customTipFormControl.enable()
    this.tipFormControl.setValue(this.customTipFormControl.value ?? 0)
  }

  onCustomTipOptionDeselected() {
    this.customTipFormControl.disable()
  }

  onCustomTipInputChanged() {
    this.tipFormControl.setValue(this.customTipFormControl.value ?? 0)
  }
}
