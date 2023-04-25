import Stripe from "stripe";
import { MultiLanguageString } from "../model/multi-language-string";

declare function createProduct(name: string | null, description: string | null, price: number, currency: string, image: string | null): Promise<Stripe.Response<Stripe.Product>>;
declare function updateProduct(id: string, name: MultiLanguageString, description: MultiLanguageString, price: number, currency: string, image: string | null): Promise<Stripe.Response<Stripe.Product>>;
declare function retrieveProductInformationById(id: string): Promise<Stripe.Response<Stripe.Product>>;
declare function deleteProduct(id: string): Promise<Stripe.Response<Stripe.Product>>;
export { createProduct,
         updateProduct,
         retrieveProductInformationById,
         deleteProduct };