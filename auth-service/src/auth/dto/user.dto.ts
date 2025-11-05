import { IsString, IsNotEmpty, IsEmail, IsArray, IsOptional } from 'class-validator'

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string

  @IsString()
  @IsNotEmpty()
  userPhoneNumber: string

  @IsString()
  @IsNotEmpty()
  userGender: string

  @IsEmail()
  @IsNotEmpty()
  userEmail: string

  @IsString()
  @IsNotEmpty()
  userPassword: string

  @IsString()
  @IsNotEmpty()
  userAadharNumber: string

  @IsArray()
  @IsOptional()
  category?: string[]
}
