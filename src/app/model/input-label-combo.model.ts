import { ValidationAttributes } from "./validation-attributes.model";

export interface InputLabelCombo {
	id: string;
	label: string;
	type: string;
    abs: string;
	name: string;
	properties: ValidationAttributes;
}