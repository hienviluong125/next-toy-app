import type { AxiosResponse } from 'axios'
import type { JwtPayload } from 'jsonwebtoken'

import axios from 'axios'
import { decode } from 'jsonwebtoken'

const axiosInstance = axios.create()

const refreshNewAccessToken = (): Promise<AxiosResponse> => {
  return axios.post("/api/v1/auth/keepLogin")
}

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''

  if (!token) return config

  config['headers'] = { Authorization: `Bearer ${token}` }

  const decodedPayload: JwtPayload | null | string = decode(token)
  const exp = (decodedPayload as JwtPayload).exp
  const now = new Date()
  // If accessToken expired
  if (exp && exp < (now.getTime() / 1000)) {
    return refreshNewAccessToken()
      .then(resp => {
        config['headers'] = { Authorization: `Bearer ${resp.data.accessToken}` }
        localStorage.setItem("accessToken", resp.data.accessToken)
        return config
      }).catch(() => {
        localStorage.removeItem("accessToken")
        return config
      })
  }

  return config
})

export default axiosInstance
