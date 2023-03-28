import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FormFieldsProperties {
	required: boolean;
	minLength: number;
	maxLength: number;
}

export interface FormFields {
	id: string;
	label: string;
	type: string;
    abs: string;
	name: string;
	properties: FormFieldsProperties;
}

export interface SignUp {
	tabTitle: string;
	title: string;
	formFields: FormFields[];
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

	getContent() {
		return this.http.get<SignUp>(this.signUpUrl);
	}
}
