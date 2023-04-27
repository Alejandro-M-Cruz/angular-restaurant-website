import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CurrentOrderService } from 'src/app/services/current-order.service';

@Component({
  selector: 'app-tip-selector',
  templateUrl: './tip-selector.component.html',
  styleUrls: ['./tip-selector.component.css']
})
export class TipSelectorComponent implements OnInit{
  form = this.fb.group({
    tip:[0]
  })
  constructor(private readonly fb:FormBuilder,private readonly order:CurrentOrderService) {
  }

  ngOnInit(){
    this.form.controls.tip.valueChanges.subscribe(tipValue =>this.order.tip = tipValue)
  }
}
