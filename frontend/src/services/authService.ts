import { api } from './api'
import { API_ENDPOINTS } from '../constants/api'
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types'

export const authService = {
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REGISTER,
      credentials
    )
    return data
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials
    )
    return data
  },
}
