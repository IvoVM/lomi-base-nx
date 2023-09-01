import axios from "axios";

export async function createNewVariant(variantParams:variantParams){
    const res = await axios.post("https://lomi.cl/api/v1/products/"+variantParams.slug+"/variants?variant[price]="+variantParams.price+"&variant[sku]="+variantParams.sku+"&variant[option_value_ids][]=22&variant[ean]="+variantParams.ean+"&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3").catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export async function getVariant(variantId:string){
    const res = await axios.get("https://lomi.cl/api/v1/variants/"+variantId).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export async function updateVariant(variantParams:any){
    let queryStr = ""
    for(var param in variantParams){
        if(variantParams[param] == undefined){
            delete variantParams[param]
        } else {
            queryStr += `variant[${param}]=${variantParams[param]}&`
        }
    }
    const res = await axios.put("https://lomi.cl/api/v1/variants/"+variantParams.id+"?"+queryStr).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export async function changePriceToDefault(variantId:string){
    const res = await axios.delete("https://lomi.cl/api/v1/variants/"+variantId+"/delete_promotion").catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export async function listVariantsBySku(sku:string){
    const res = await axios.get("https://lomi.cl/api/v1/variants?q[sku_cont]="+sku+"&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3").then(
        res => {
            return res.data.variants
        }
    ).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res
}

export type variantParams = {
    sku: string,
    price: number,
    slug: string,
    ean: string,
}