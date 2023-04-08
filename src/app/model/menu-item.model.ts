import {MultiLanguageString} from "./multi-language-string";

export interface MenuItem {
  id?: string;
  name: MultiLanguageString;
  ingredients: MultiLanguageString;
  price: number;
  sectionId: string;
  imageUrl?: string;
}
