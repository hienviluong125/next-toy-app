import type { AxiosResponse } from "axios"
import axios from "../common/axiosInstance"

export const getProfileService = (): Promise<AxiosResponse> => {
  return axios.request({
    method: "GET",
    url: "/api/v1/profile"
  })
}
