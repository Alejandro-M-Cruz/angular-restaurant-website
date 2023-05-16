import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tip-selector',
  templateUrl: './tip-selector.component.html',
  styleUrls: ['./tip-selector.component.css']
})
export class TipSelectorComponent {

  @Output() tip: EventEmitter<number> = new EventEmitter<number>();

  selectedOption: string;

  onOptionChange() {
    switch(this.selectedOption) {
      case 'option1':
        this.tip.emit(0);
        break;
      case 'option2':
        this.tip.emit(1);
        break;
      case 'option3':
        this.tip.emit(2);
        break;
      case 'option4':
        this.tip.emit(3);
        break;
      case 'option5':
        this.tip.emit(4);
        break;
    }
  }

}
