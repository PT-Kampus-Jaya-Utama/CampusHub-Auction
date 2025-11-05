import { searchApi } from './api'
import { Product } from '../types'

export const productService = {
  // Search products by name
  async searchProducts(searchTerm: string): Promise<Product[]> {
    const response = await searchApi.get<Product[]>(`/api/v1/productname/${searchTerm}`)
    return response.data
  },

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const response = await searchApi.get<Product[]>('/api/v1/product')
    return response.data
  },

  // Get product by ID
  async getProductById(id: number): Promise<Product> {
    const response = await searchApi.get<Product>(`/api/v1/product/${id}`)
    return response.data
  },
}
