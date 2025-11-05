import { authApi } from './api'
import { IUser } from '../types'

export const registrationService = {
  // Register new user
  async registerUser(user: IUser): Promise<any> {
    const response = await authApi.post('/register', user)
    return response.data
  },
}
