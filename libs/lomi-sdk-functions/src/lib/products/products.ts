import axios from "axios";
import { SpreeEntity, SpreeListResponse, setIncluded } from "../../spree";
import { Variant } from "./variants";

export type Product = {
    name: string;
    description: string;
    available_on: string;
    deleted_at: string | null;
    slug: string;
    meta_description: string;
    meta_keywords: string;
    created_at: string;
    updated_at: string;
    promotionable: boolean;
    meta_title: string;
    discontinue_on: string;
    can_be_part: boolean;
    due_date: string | null;
    max_quantity: number | null;
    discontinued_alert: string | null;
    security_stock: number | null;
    alcohol_restriction: boolean;
    only_for_shipping: boolean | null;
    structured_data: any; // Cambia 'any' por el tipo adecuado si se conoce la estructura
    ean: string | null;
    global: boolean;
    show_ean_on_invoice: boolean;
    show_sku_on_invoice: boolean;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    available: boolean;
    currency: string;
    price: string;
    display_price: string;
    compare_at_price: string;
    display_compare_at_price: string;

    images?: SpreeEntity<any>[];
    variants?: SpreeEntity<Variant>[]
}


export const listProducts = async (): Promise<SpreeListResponse<Product>> => {
    const res = await axios.get(`https://lomi.cl/api/v2/platform/products?include=images,variants,variants.stock_items`).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    console.log(res.data)
    const returnedArray:Product[] = res.data.data.map((product:SpreeEntity<Product>) => [])
    for(let i = 0; i < res.data.data.length; i++){
        setTimeout(() => {
            returnedArray[i] = res.data.data[i]
        }, 25* i + 500)
    }
    setIncluded(res.data, "image")
    setIncluded(res.data, "variant")
    res.data.data.map((product:SpreeEntity<Product>) => {
        product.attributes.variants?.forEach((variant:SpreeEntity<Variant>) => {
            variant.attributes.stock_items = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "stock_item" && entity.relationships.variant.data.id === variant.id)
        })
    })
    return {
        ...res.data,
        data: returnedArray
    }
}

export const getProductsByTaxonId = async (id: string): Promise<SpreeListResponse<Product>> => {
    const res = await axios.get(`https://lomi.cl/api/v2/platform/taxons/${id}?include=products,products.variants,products.images,products.variants.stock_items`).catch(e => {
        console.log(e)
        return e.response.data
    })
    console.log(res.data || res)
    const products = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "product")
    const variants = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "variant")
    const stock_items = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "stock_item")
    const images = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "image")
    products.map((product:SpreeEntity<Product>) => {
        product.attributes.variants = variants.filter((variant:SpreeEntity<Variant>) => {
            (variant.attributes as any).images = images.filter((image:SpreeEntity<any>) => image.relationships.viewable.data.id === variant.id)
            variant.attributes.stock_items = stock_items.filter((stock_item:SpreeEntity<any>) => stock_item.relationships.variant.data.id === variant.id)
            return variant.relationships.product.data.id === product.id
        })
        product.attributes.images = images.filter((image:SpreeEntity<any>) => image.relationships.viewable.data.id === product.id)
    })
    return {
        ...res.data,
        data: products
    }
}

export const searchProducts = async (query: string): Promise<SpreeListResponse<Product>> => {
    const res = await axios.get(`https://lomi.cl/api/v2/platform/products?filter[name_cont]=${query}&include=images,variants,variants.stock_items`).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    console.log(res.data)
    const returnedArray:Product[] = res.data.data.map((product:SpreeEntity<Product>) => [])
    for(let i = 0; i < res.data.data.length; i++){
        setTimeout(() => {
            returnedArray[i] = res.data.data[i]
        }, 25* i + 300)
    }
    setIncluded(res.data, "image")
    setIncluded(res.data, "variant")
        res.data.data.map((product:SpreeEntity<Product>) => {
        product.attributes.variants?.forEach((variant:SpreeEntity<Variant>) => {
            variant.attributes.stock_items = res.data.included.filter((entity:SpreeEntity<any>) => entity.type === "stock_item" && entity.relationships.variant.data.id === variant.id)
        })
    })
    return {
        ...res.data,
        data: returnedArray
    }
}