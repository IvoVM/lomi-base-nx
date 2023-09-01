import { client } from "./client"
import axios from "axios"

export async function getProducerByName(name: string) {
    return await axios.get(client.unicornHost+"/api/v1/producers?q[name_eq]="+name+"&token=8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3").then(
        res => {
            if(res.data.producers.length > 0){
                return res.data.producers[0]
            } else {
                return {}
            }
        }
    )
}

export async function createProducer(name: string, description: string, image: string) {
    return await axios.post(client.unicornHost+"/api/v1/producers?producer[name]="+name+"&producer[phone]=99&producer[state]=active").then(
        res => {
            if(res.data.producer){
                return res.data.producer
            }
            return res.data
        }
    )
}

export async function createProducerIfDoesntExistByName(name: string){
    const res = await getProducerByName(name)
    if(res.id){
        return res
    } else {
        const res = await createProducer(name, "", "")
        return res
    }
}