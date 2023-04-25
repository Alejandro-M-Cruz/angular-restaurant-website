import { MultiLanguageString } from "../model/multi-language-string";

declare function createProduct(name: MultiLanguageString, description: MultiLanguageString, price: number, currency: string, image: string | null): void;
declare function updateProduct(id: string, name: MultiLanguageString, description: MultiLanguageString, price: number, currency: string, image: string | null): void;
declare function retrieveProductInformationById(id: string): void;
export { createProduct,
         updateProduct,
         retrieveProductInformationById };