import {MenuItem} from "./menu-item.model";
import {MultiLanguageString} from "./multi-language-string";

export interface MenuSection {
  id?: string;
  name: MultiLanguageString;
  items: MenuItem[];
}
