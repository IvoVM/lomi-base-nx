import axios from "axios";
import { client } from "./client";
import { configuration } from "../../store";

export const createNewProduct = async (product: ProductParams) => {
    const productUrl = `https://lomi.cl/api/v1/products?product[name]=${product.name}&product[description]=${product.description}&product[price]=${product.price}&product[shipping_category_id]=${configuration.STORE_SHIPPING_CATEGORY_ID}&product[sku]=${product.ean}&product[prototype_id]=2&product[taxon_ids][]=${product.tags[product.tags.length - 1]}&product[store_ids][]=1&product[store_ids][]=${product.store_id}&product[producer_id]=${product.producer}&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3`;
    console.log(product, "product",productUrl)
    try{
        const res = await axios.post(productUrl).then((res)=>{
            return res.data
        }).catch(e => {
            return {
                error: {
                    "message": "Error creating product",
                    "ERR_CODE": "CREATE_PRODUCT_ERROR",
                    data: e.response.data
                }
            }
        })
        return res
    } catch(error){
        console.log(error, "error")
        return {
            error: {
                "message": "Error creating product",
                "ERR_CODE": "CREATE_PRODUCT_ERROR",
            }
        }
    }
}

export const removeExtraBackslashes = (str: string) => {
    return str.replace(/\\n/g, "<br>");
}

export const getProduct = async (productId: number) => {
    return axios.get(`${client.host}/api/v2/platform/products/${productId}`).then((res)=>{
        return res.data.data
    })
}

export const findProductBySku = async (sku:string) => {
    return axios.get(`${client.host}/api/v1/products?q[variants_ean_cont]=${sku}`).then((res)=>{
        return res.data?.products || []
    })
}

export const findProductBySlug = async (slug:string) => {
    return axios.get(`${client.host}/api/v1/products/${slug}`).then((res)=>{
        return res.data
    })
}

export async function addTaxons(productId:number, taxonIds: string){
    //http://localhost:3000/api/v1/products/576/add_categories
    await axios.patch("https://lomi.cl/api/v1/products/"+productId+"/add_categories",{
        product:{
            taxon_ids: ""+taxonIds
        }
    }).then((res)=>{
        return res.data
    }).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
}

export async function removeTaxons(productId:number, taxonIds: string){
    //PATCH http://localhost:3000/api/v1/products/576/remove_categories
    await axios.patch("https://lomi.cl/api/v1/products/"+productId+"/remove_categories",{
        product: {
            taxon_ids: taxonIds
        }
    }).then((res)=>{
        return res.data
    }).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
}

export const updateProduct = async (params: any, productId: number) => {
    let queryStr = ""
    for(var param in params){
        if(params[param] == undefined){
            delete params[param]
        } else {
            if(param == 'store_id'){
                queryStr += `product[store_ids][]=${params[param]}&`
                continue
            } else {
                queryStr += `product[${param}]=${params[param]}&`
            }
        }
    }
    return axios.patch(`${client.host}/api/v1/products/${productId}?${queryStr}`)
}

export const linkProductToTaxon = async (productId:number, taxonIds:number[]) => {
    return axios.patch(`${client.host}/api/v2/platform/products/${productId}`,{
        product: {
            taxon_ids: taxonIds
        }
    })
}

export interface ProductParams {
    name: string
    price: string
    description: string
    shipping_category_id: number,
    master_sku: string
    producer: string,
    ean: string,    
    store_id?: number,

    imageCdns?: string[] | false;
    tags: string[]
}