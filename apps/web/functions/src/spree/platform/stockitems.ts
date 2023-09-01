import axios from 'axios'

export async function setStockItem(stockLocationId:string, stockItemId:string, quantity:number):Promise<any>{
    const res = await axios.put(`https://lomi.cl/api/v1/stock_locations/${stockLocationId}/stock_items/${stockItemId}?token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3`, {
        stock_item: {
            count_on_hand: quantity,
            force: true
        }
    }).then(
        res => {
            if(res.data){
                return res.data
            } else {
                return {}
            }
        }
    ).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res
}

export async function createStockItem(stockLocationId:string,variantId:string,count_on_hand:number){
    const res = await axios.post(`https://lomi.cl/api/v1/stock_locations/${stockLocationId}/stock_items?token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3`, {
        stock_item: {
            variant_id: variantId,
            count_on_hand: count_on_hand
        }
    }).then(
        res => {
            if(res.data){
                return res.data
            } else {
                return {}
            }
        }
    ).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
    return res
}
