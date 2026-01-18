import { create } from 'zustand'
import { User } from '../types'
import { authService } from '../services/authService'

interface AuthStore {
  token: string | null
  user: User | null
  isLoading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  setToken: (token: string) => void
  isAuthenticated: () => boolean
  resetError: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const { token, user } = await authService.login({ email, password })

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({ token, user, isLoading: false })
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao fazer login'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null })
    try {
      const { token, user } = await authService.register({
        email,
        password,
        name,
      })

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      set({ token, user, isLoading: false })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || 'Erro ao registrar'
      set({ error: errorMessage, isLoading: false })
      throw new Error(errorMessage)
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },

  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token })
  },

  isAuthenticated: () => {
    return get().token !== null
  },

  resetError: () => set({ error: null }),
}))
