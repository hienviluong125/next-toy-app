import type { AxiosResponse } from "axios"
import axios from "../common/axiosInstance"

export type Property = {
  id: number
  address: string
  apartmentNumber: string
  price: number
  thumbnail: string
  status: boolean
}

export const getPropertiesService = (): Promise<AxiosResponse<Property[]>> => {
  return axios.request({
    method: "GET",
    url: "/api/v1/properties"
  })
}
