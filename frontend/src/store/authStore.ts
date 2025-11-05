import { create } from 'zustand'
import { AuthState } from '../types'

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  token: null,

  login: (username: string, token: string) => {
    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', `Bearer ${token}`)
    set({ isAuthenticated: true, username, token })
  },

  logout: () => {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    set({ isAuthenticated: false, username: null, token: null })
  },

  initialize: () => {
    const username = sessionStorage.getItem('username')
    const token = sessionStorage.getItem('token')
    if (username && token) {
      set({ isAuthenticated: true, username, token })
    }
  },
}))

export default useAuthStore
