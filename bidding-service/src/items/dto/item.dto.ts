import { IsNumber, IsString, IsNotEmpty } from 'class-validator'

export class CreateItemDto {
  @IsNumber()
  itemId: number

  @IsString()
  @IsNotEmpty()
  itemName: string

  @IsString()
  @IsNotEmpty()
  itemDescription: string

  @IsString()
  @IsNotEmpty()
  itemCategory: string

  @IsString()
  @IsNotEmpty()
  itemQuality: string

  @IsNumber()
  numberOfDaysForRent: number

  @IsNumber()
  itemBaseRent: number

  @IsNumber()
  minimumBiddingAmount: number

  @IsNumber()
  timeLeft: number

  @IsNumber()
  latestBid: number

  @IsNumber()
  yourBid: number

  @IsNumber()
  numberOfDaysNeeded: number

  @IsString()
  userEmailId: string

  @IsString()
  userName: string

  @IsNumber()
  userPhoneNumber: number

  @IsString()
  bidderEmailId: string

  @IsString()
  biddername: string

  @IsNumber()
  bidderPhoneNumber: number
}
