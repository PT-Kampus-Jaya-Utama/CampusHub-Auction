import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class WishlistProductDto {
  @IsNumber()
  @IsOptional()
  id?: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  owner: string

  @IsString()
  @IsNotEmpty()
  des: string
}
