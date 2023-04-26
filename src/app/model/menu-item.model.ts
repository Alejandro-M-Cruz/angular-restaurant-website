import {MultiLanguageString} from "./multi-language-string";

export interface MenuItem {
  [key: string]: any
  id?: string;
  idStripe?: string;
  name: MultiLanguageString;
  ingredients: MultiLanguageString;
  price: number;
  sectionId: string;
  imageUrl: string | null;
}
