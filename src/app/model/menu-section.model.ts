import {MenuItem} from "./menu-item.model";
import {MultiLanguageString} from "./multi-language-string";

export interface MenuSection {
  name: MultiLanguageString;
  items: MenuItem[]
}
