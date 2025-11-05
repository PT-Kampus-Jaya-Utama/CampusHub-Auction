import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class RentItemsDto {
  @IsString()
  @IsNotEmpty()
  itemName: string

  @IsString()
  @IsNotEmpty()
  itemCategory: string

  @IsNumber()
  itemQuantity: number

  @IsString()
  @IsNotEmpty()
  itemDescription: string

  @IsNumber()
  itemDurationOfRent: number

  @IsNumber()
  baseRent: number
}
