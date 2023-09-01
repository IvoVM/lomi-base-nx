import { client } from "./client"

import axios from "axios"

let token = "";

export const getAccessToken = async () => {
    if(token) return token;
    const response = await axios.post(`${client.proxiedHost}`,
      {
        "email": "marco@lomi.cl",
        "password": "Declivenacional1",
        "scope": "admin",
        "grant_type": "refresh_token",
      }, {
        headers: {
          "Authorization": `Bearer ${client.proxiedHostApiKey}`,
        }
      })
    console.log(response.data.accessToken.access_token, "access_token")
    const bearerToken: string = response.data.accessToken.access_token
    token = bearerToken;
    return bearerToken
}

export const getSyncToken = () => {
    if(token) return token;
    else {
      return ""
    }
}