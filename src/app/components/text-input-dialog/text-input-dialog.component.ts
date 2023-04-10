import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";

export interface TextInputDialogData {
  title: string;
  labels: string[];
  form: FormGroup;
  yes: string;
  no: string;
}

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.css']
})
export class TextInputDialogComponent {
  controlsKeys = Object.keys(this.data.form.controls)

  constructor(@Inject(MAT_DIALOG_DATA) public data: TextInputDialogData) {
  }
}
