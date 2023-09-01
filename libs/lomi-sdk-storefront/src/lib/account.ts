import { IAccount, ICreateOptions, INewPassword } from "../types/account.type"
import { AddressAttributes, IAddresses } from "../types/adress.type"
import { IOrderData, IOrdersList } from "../types/orders.type"
import { createAxiosInstance } from "./axiosInstance"

export const account = () => {

    const Axios = createAxiosInstance().initInstance()
    const accountUrl = '/api/v2/storefront/account'
    
    const getUserInfo = async (token: string): Promise<IAccount> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseUserInfo = await Axios.get(accountUrl)
        return responseUserInfo.data
    }

    const create = async (user: ICreateOptions): Promise<IAccount> => {
        const responseCreate = await Axios.post(accountUrl, { user })
        return responseCreate.data
    }
    
    const resetPassword = async (token: string, user: INewPassword): Promise<IAccount> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseResetPassword = await Axios.patch(accountUrl, { user })
        return responseResetPassword.data
    }
    
    const createAddress = async (token: string, address: AddressAttributes): Promise<IAddresses> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseCreateAddress = await Axios.post(`${accountUrl}/addresses`, { address })
        return responseCreateAddress.data
    }

    const AddressesList = async (token: string): Promise<IAddresses> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseList = await Axios.get(`${accountUrl}/addresses`)
        return responseList.data
    }

    const updateAddress = async (token: string, addressId: string, address: Partial<AddressAttributes>): Promise<IAddresses> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseUpdateAddress = await Axios.patch(`${accountUrl}/addresses/${addressId}`, { address })
        return responseUpdateAddress.data
    }

    const removeAddress = async (token: string, addressId: string): Promise<IAddresses> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseRemoveAddress = await Axios.delete(`${accountUrl}/addresses/${addressId}`)
        return responseRemoveAddress.data
    }

    const completedOrdersList = async (token: string): Promise<IOrdersList> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseCompletedOrdersList = await Axios.get(`${accountUrl}/orders`)
        return responseCompletedOrdersList.data
    }

    const completedOrder = async (token: string, orderNumber: string): Promise<IOrderData> => {
        const Axios = createAxiosInstance().initInstance(token)
        const responseCompletedOrder = await Axios.get(`${accountUrl}/orders/${orderNumber}`)
        return responseCompletedOrder.data.data
    }

    return {
        getUserInfo,
        create,
        resetPassword,
        createAddress,
        AddressesList,
        updateAddress,
        removeAddress,
        completedOrdersList,
        completedOrder
    }
}