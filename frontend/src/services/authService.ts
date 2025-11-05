import { authApi } from './api'
import { UserDTO, JwtResponse } from '../types'

export const authService = {
  // Login
  async authenticate(username: string, password: string): Promise<JwtResponse> {
    const response = await authApi.post<JwtResponse>('/authenticate', {
      username,
      password,
    } as UserDTO)
    return response.data
  },

  // Check if user is logged in
  isUserLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null
  },

  // Get current username
  getCurrentUsername(): string | null {
    return sessionStorage.getItem('username')
  },
}
