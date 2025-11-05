import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  userEmail?: string

  @IsString()
  @IsOptional()
  userName?: string

  @IsString()
  @IsOptional()
  userPhoneNumber?: string
}
