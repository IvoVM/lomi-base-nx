import axios from 'axios'

export async function getStockLocation(stockLocationId:string):Promise<any>{
    const res = await axios.get(`https://lomi.cl/api/v2/storefront/stock_locations/${stockLocationId}`).then(
        res => {
            if(res.data){
                console.log(res.data)
                return res.data.data.attributes
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