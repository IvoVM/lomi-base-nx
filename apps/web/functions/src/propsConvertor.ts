import { ProductParams } from "./spree/platform/products";
import { configuration } from "./store";

export interface PropsAdapter{
    toSpreeProductParams(): ProductParams | false
}

export class MutableProduct<T> implements PropsAdapter{
    product: T

    constructor(product: T){
        this.product = product
    }

    toSpreeProductParams(): ProductParams | false {
        const iConfiguration:any = configuration.inventoryConfiguration;
        const product:any = this.product;
        console.log("[Converting product to spree params] ", product[iConfiguration.product.name], iConfiguration.product.name)
        if(!product[iConfiguration.product.name]){
            return false
        }
        const ProductParams: ProductParams = {
            name: product[iConfiguration.product.name],
            producer: product[iConfiguration.product.producer],
            price: product[iConfiguration.product.price],
            description: product[iConfiguration.product.description] || "",
            master_sku: product[iConfiguration.product.master_sku],
            ean: product[iConfiguration.variant.ean],

            shipping_category_id: configuration.STORE_SHIPPING_CATEGORY_ID,

            imageCdns: iConfiguration.imageCdns? [
                ...iConfiguration.imageCdns.map((cdnKey:string) => {
                    return product[cdnKey]
                })
            ]: false,

            tags: iConfiguration.taxonsHierarchy.map((taxonKey:string) => {
                return product[taxonKey]
            })
        }
        return ProductParams
    }
}