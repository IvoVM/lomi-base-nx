import axios from "axios";

export function setStockItemStock(quantity:number){
    //PUT /api/stock_locations/1/stock_items/2
    return axios.put("https://lomi.cl/api/stock_locations/1/stock_items/2", {
        stock_item: {
            count_on_hand: quantity,
            force: true
        }
    }).then(res => {
        return res.data
    }).catch(e => {
        console.log(e.response.data)
        return e.response.data
    })
}