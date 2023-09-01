import axios from "axios";
import { SpreeEntityResponse, SpreeListParams, SpreeListResponse } from "../../spree";

export type Taxon = {
    "name": string,
    "pretty_name": string,
    "permalink": string,
    "seo_title": string,
    "description": string,
    "meta_title": string,
    "meta_description": string,
    "meta_keywords": string,
    "left": number,
    "right": number,
    "position": number,
    "depth": number,
    "updated_at": Date,
    "is_root": boolean,
    "is_child": boolean,
    "is_leaf": boolean,
    "hide_from_nav": boolean,
    "social_link"?: string,
    "internal_link"?: string,
    "wsp_number"?: string,
    "show_into_home": boolean,
    "show_into_buttons_carousel": boolean,
    "featured": boolean
}


export const listTaxons = async (): Promise<SpreeListResponse<Taxon>> => {
    const res = await axios.get(`https://lomi.cl/api/v2/storefront/taxons?filter[roots]=true&per_page=100&include=image_button&date=`).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}

export const getTaxonById = async (id: string): Promise<SpreeEntityResponse<Taxon>> => {
    const res = await axios.get(`https://lomi.cl/api/v2/storefront/taxons/${id}?include=image_button,children&`+(new Date().getTime())).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}