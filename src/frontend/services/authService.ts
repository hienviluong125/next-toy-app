import type { AxiosResponse } from "axios"
import axios from "../common/axiosInstance"

export type AuthInput = {
  email: string
  password: string
  name?: string
}

type AuthResponse = {
  accessToken: string
}

type AuthResponsePromise = Promise<void | AxiosResponse<AuthResponse>>

const storeAccessToken = (resp: AxiosResponse<AuthResponse>) => {
  const data = resp.data as AuthResponse

  if (data && data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken)
  }

  return resp
}

export const loginService = (input: AuthInput): AuthResponsePromise => {
  return axios.request({
    method: "POST",
    url: "/api/v1/auth/login",
    data: input
  }).then(storeAccessToken)
}

export const registerService = (input: AuthInput): AuthResponsePromise => {
  return axios.request({
    method: "POST",
    url: "/api/v1/auth/register",
    data: input
  }).then(storeAccessToken)
}

export const logoutService = (): Promise<AxiosResponse> => {
  return axios.request({
    method: "POST",
    url: "/api/v1/auth/logout",
    withCredentials: true
  })
}
