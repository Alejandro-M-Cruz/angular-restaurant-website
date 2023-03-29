import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InputLabelCombo } from '../model/input-label-combo.model';

export interface SignUp {
	tabTitle: string;
	title: string;
	formFields: InputLabelCombo[];
	cancelButtonLabel: string;
	confirmButtonLabel: string;
	already: string;
	alreadyLink: string;
	linkHref: string;
}

@Injectable({
  	providedIn: 'root'
})

export class SignUpService {
	private signUpUrl = 'http://localhost:5000/signUpPage'

	constructor(private http: HttpClient) { }

	getContent(): Observable<SignUp> {
		return this.http.get<SignUp>(this.signUpUrl);
	}
}
