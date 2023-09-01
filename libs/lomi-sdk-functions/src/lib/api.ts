import { getProductsByTaxonId, listProducts, searchProducts } from "./products/products";
import { getTaxonById, listTaxons } from "./products/taxons";
import axios from "axios";
import { getStockLocation, listStockLocations } from "./stores/stock_locations";
import { setStockItemStock } from "./products/stock_items";

const EXPIRED_TOKEN_ERROR = "Token de sesión expirado"
const proxiedAccessUrl = "https://us-central1-lomi-35ab6.cloudfunctions.net/proxiedAccess";

axios.interceptors.request.use(
    (request:any) => {
        const v1Token = "8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3";
        const v2Token = localStorage.getItem("token")?.replace(/"/g, "");
        if(!request.url.includes("token") && request.url.includes("v1")){
            request.url = request.url.includes("?") ? request.url + "&token="+v1Token : request.url + "?token="+v1Token
        } else {
            console.log("[Request Headers]", request.headers)
            request.headers.Authorization = `Bearer ${v2Token}`
        }
        console.log("[Request URL]", request.url)
        return request
    },
)

axios.interceptors.response.use(
    (response:any) => {
        console.log("[Response Status]", response.status, "from [Response URL]", response.config.url)
        return response
    },
    error => {
        if(error.response?.data?.error == EXPIRED_TOKEN_ERROR){
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        console.log("[Response Error Data]", error.response?.data ? error.response.data : error)
        return error.response
    }
)
export class lomiAPI{
    public stockLocations = {
        listStockLocations: listStockLocations,
        getStockLocation: getStockLocation
    }
    public taxons = {
        listTaxons: listTaxons,
        getTaxon: getTaxonById
    }

    public stockItems = {
        setItemStock: setStockItemStock
    }
    public products = {
        listProducts: listProducts,
        searchProducts: searchProducts,   
        getProductsByTaxonId:getProductsByTaxonId 
    }
}