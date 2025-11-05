import { IsNumber, IsString, IsNotEmpty, IsArray } from 'class-validator'

export class ProductDetailsDto {
  @IsNumber()
  itemid: number

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  owner: string
}

export class CreateProductDto {
  @IsNumber()
  id: number

  @IsString()
  @IsNotEmpty()
  productName: string

  @IsArray()
  details: ProductDetailsDto[]
}
