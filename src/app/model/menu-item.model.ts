import {MultiLanguageString} from "./multi-language-string";

export interface MenuItem {
  name: MultiLanguageString;
  ingredients: MultiLanguageString;
  price: number;
  imageSrc: string | null;
}
