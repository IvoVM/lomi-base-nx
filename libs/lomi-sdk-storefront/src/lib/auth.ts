import { GRANT_TYPE, ICredentials, IOAuthToken } from '../types/token'
import { createAxiosInstance } from './axiosInstance'

export const auth = () => {
    const Axios = createAxiosInstance().initInstance()

    const getToken = async (credentials: ICredentials): Promise<IOAuthToken> => {
      const responseGetToken = await Axios.post('/spree_oauth/token', {
        username: credentials.username,
        password: credentials.password,
        grant_type: GRANT_TYPE.PASSWORD
      })
      return responseGetToken.data
  }

  const refreshtoken = async (refreshToken: string) => {
    const responseRefreshToken = await Axios.post('/spree_oauth/token', {
        grant_type: GRANT_TYPE.REFRESH_TOKEN,
        refresh_token: refreshToken
    })
    return responseRefreshToken.data
  }

  return {
    getToken,
    refreshtoken
  }
  
}