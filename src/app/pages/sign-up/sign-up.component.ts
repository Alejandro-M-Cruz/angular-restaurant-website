import { Component } from '@angular/core';
import { SignUp, SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  signUp: SignUp | undefined;
  constructor(private signUpService: SignUpService) {
  }

  clear() {
    this.signUp = undefined;
  }

  showContent() {
    this.signUpService.getContent().subscribe(
      data => {
        this.signUp = data;
      }
    );  
  }
}
