import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  userEmail: string

  @IsString()
  @IsNotEmpty()
  userName: string

  @IsString()
  @IsNotEmpty()
  userPhoneNumber: string

  @IsString()
  @IsNotEmpty()
  userGender: string

  @IsString()
  @IsNotEmpty()
  userAadharNumber: string

  @IsString()
  @IsNotEmpty()
  userPassword: string

  @IsArray()
  @IsOptional()
  rentItems?: any[]

  @IsArray()
  @IsOptional()
  biddedItems?: any[]
}
