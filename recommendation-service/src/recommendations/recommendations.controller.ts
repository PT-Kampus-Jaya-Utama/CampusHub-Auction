import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common'
import { RecommendationsService } from './recommendations.service'
import { WishlistProductDto } from './dto/wishlist.dto'

@Controller('api/v1')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get('users')
  async getAllUsers() {
    return this.recommendationsService.getAllUsers()
  }

  @Get('userslikes')
  async getUserLikes() {
    return this.recommendationsService.getUserLikes()
  }

  @Get('userrcm')
  async getRecommendations() {
    return this.recommendationsService.getRecommendations()
  }

  @Get('myproducts')
  async getWishlist() {
    return this.recommendationsService.getWishlist()
  }

  @Post('savewishlist')
  async addToWishlist(@Body(ValidationPipe) wishlistDto: WishlistProductDto) {
    return this.recommendationsService.addToWishlist(wishlistDto)
  }

  @Post('removefav')
  async removeFromWishlist(@Body(ValidationPipe) wishlistDto: WishlistProductDto) {
    return this.recommendationsService.removeFromWishlist(wishlistDto)
  }
}
