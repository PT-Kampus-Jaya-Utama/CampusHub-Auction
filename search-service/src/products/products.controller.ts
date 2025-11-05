import { Controller, Post, Get, Param, Body, ValidationPipe, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'

@ApiTags('products')
@Controller('api/v1')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('product')
  @ApiOperation({ summary: 'Save a new product' })
  @ApiResponse({ status: 201, description: 'Product saved successfully' })
  async saveProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.saveProduct(createProductDto)
  }

  @Get('product')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products' })
  async getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Return product by ID' })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id)
  }

  @Get('productname/:name')
  @ApiOperation({ summary: 'Search products by name' })
  @ApiResponse({ status: 200, description: 'Return products matching the name' })
  async getProductByName(@Param('name') name: string) {
    return this.productsService.getProductByName(name)
  }
}
