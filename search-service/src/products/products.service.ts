import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product, ProductDocument } from './schemas/product.schema'
import { CreateProductDto } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async saveProduct(createProductDto: CreateProductDto): Promise<any> {
    // Check if product already exists
    const existingProduct = await this.productModel.findOne({ id: createProductDto.id })

    if (existingProduct) {
      throw new ConflictException('Product already exists')
    }

    const newProduct = new this.productModel(createProductDto)
    const savedProduct = await newProduct.save()

    return { message: 'Product saved successfully', product: savedProduct }
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }

  async getProductByName(name: string): Promise<Product[]> {
    const products = await this.productModel.find({ productName: name }).exec()

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found with that name')
    }

    return products
  }
}
