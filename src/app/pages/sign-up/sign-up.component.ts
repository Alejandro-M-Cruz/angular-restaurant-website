import { Component ,  OnInit } from '@angular/core';
import { SignUp, SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUp: SignUp | undefined;

  
  
  constructor(private signUpService: SignUpService) {
  }

  clear() {
    this.signUp = undefined;
  }

  ngOnInit(): void {
    this.signUpService.getContent().subscribe(
      data => {
        this.signUp = data;
      }
    );
  }
}
