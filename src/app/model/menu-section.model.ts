import {MenuItem} from "./menu-item.model";
import {MultiLanguageString} from "./multi-language-string";

export interface MenuSection {
  [key: string]: any
  id?: string;
  name: MultiLanguageString;
}

export interface DisplayableMenuSection extends MenuSection {
  items: MenuItem[]
}
