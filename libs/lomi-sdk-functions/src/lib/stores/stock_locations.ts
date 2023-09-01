import axios from "axios";
import { SpreeListParams, SpreeListResponse } from "../../spree";

export type StockLocation = {
    id: string;
    address1: string;
    address2: string;
    city: string;
    country: any;
    name: string;
    phone: string;
    state: any;

    stores?: {
        id: string;
        name: string;
    }[][];

    zones?: {
        id: string;
        name: string;
        counties: {
            id: string;
            name: string;
        }[][]
    }[][]
}


export const listStockLocations = async (): Promise<StockLocation[]> => {
    const res = await axios.get(`https://lomi.cl/api/v1/stock_locations`).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data.stock_locations
}

export const getStockLocation = async (id: string): Promise<any> => {
    const res = await axios.get(`https://lomi.cl/api/v2/storefront/stock_locations/${id}`).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res.data
}