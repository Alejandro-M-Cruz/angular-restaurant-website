import {MultiLanguageString} from "./multi-language-string";

export interface MenuItem {
  [key: string]: any
  id?: string;
  productIdStripe?: string;
  priceIdStripe?: string;
  name: MultiLanguageString;
  ingredients: MultiLanguageString;
  price: number;
  sectionId: string;
  imageUrl: string | null;
}
