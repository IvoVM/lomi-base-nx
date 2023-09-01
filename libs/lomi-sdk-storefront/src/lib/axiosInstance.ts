import axios, { AxiosInstance } from 'axios'

export const createAxiosInstance = () => {

  const initInstance = (token?: string) => {
    const instance: AxiosInstance = axios.create({
        timeout: 3000
    })
    if (!token) return instance
    instance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    return instance
  }

  return {
    initInstance
  }
}