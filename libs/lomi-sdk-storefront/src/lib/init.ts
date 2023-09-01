import axios  from 'axios'
import { HOST } from '../types/host.type'

export const initSdk = () => {
  
    const setUrl = (host: HOST) => {
        axios.defaults.baseURL = host?? HOST.LOMI
    }

    return {
        setUrl
    }
};