import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-already-signed-up',
  templateUrl: './already-signed-up-link.component.html',
  styleUrls: ['./already-signed-up-link.component.css']
})
export class AlreadySignedUpLinkComponent {
  @Input() link!: string
  @Input() alreadySignedUpText!: string
  @Input() linkText!: string
}
