import axios from "axios"
import { getSyncToken } from "./auth";

axios.interceptors.request.use(
    (request:any) => {
        const token = "8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3";
        if(!request.url.includes("token") && request.url.includes("v1")){
            request.url = request.url.includes("?") ? request.url + "&token="+token : request.url + "?token="+token
        }
        if(request.url.includes("v2")){
            if(getSyncToken()){
                console.log("[Request Headers] Sync token v2", request.headers)
                request.headers.Authorization = `Bearer ${getSyncToken()}`
            }
        }
        console.log("[Request URL]", request.url)
        return request
    }
)

axios.interceptors.response.use(
    (response:any) => {
        console.log("[Response Status]", response.status, "from [Response URL]", response.config.url)
        return response
    },
    error => {
        console.log("[Response Error Data]", error.response?.data ? error.response.data : error, error.config.url, error.config.data)
        return error.response
    }
)

export const client = {
    host: 'https://lomi.cl',
    localHost: 'http://localhost:3000',
    unicornHost: 'https://unicorn.lomi.cl',
    proxiedHost: 'https://us-central1-lomi-35ab6.cloudfunctions.net/proxiedAccess',
    proxiedHostApiKey: 'lomi123123@161803',
}