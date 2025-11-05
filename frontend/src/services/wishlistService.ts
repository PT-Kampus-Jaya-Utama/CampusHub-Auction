import { recommendationApi } from './api'
import { WishlistProduct } from '../types'

export const wishlistService = {
  // Get user's wishlist
  async getWishlist(): Promise<WishlistProduct[]> {
    const response = await recommendationApi.get<WishlistProduct[]>('/api/v1/myproducts')
    return response.data
  },

  // Add product to wishlist
  async addToWishlist(product: WishlistProduct): Promise<any> {
    const response = await recommendationApi.post('/api/v1/savewishlist', product)
    return response.data
  },

  // Remove product from wishlist
  async removeFromWishlist(product: WishlistProduct): Promise<WishlistProduct[]> {
    const response = await recommendationApi.post<WishlistProduct[]>('/api/v1/removefav', product)
    return response.data
  },

  // Get personalized recommendations
  async getRecommendations(): Promise<WishlistProduct[]> {
    const response = await recommendationApi.get<WishlistProduct[]>('/api/v1/userrcm')
    return response.data
  },
}
