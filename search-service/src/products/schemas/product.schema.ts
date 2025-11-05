import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export class ProductDetails {
  @Prop({ required: true })
  itemid: number

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  owner: string
}

export type ProductDocument = Product & Document

@Schema({ collection: 'products' })
export class Product {
  @Prop({ required: true, unique: true })
  id: number

  @Prop({ required: true })
  productName: string

  @Prop({ type: [Object], default: [] })
  details: ProductDetails[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
