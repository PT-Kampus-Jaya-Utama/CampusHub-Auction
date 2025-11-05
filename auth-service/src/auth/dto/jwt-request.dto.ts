import { IsString, IsNotEmpty } from 'class-validator'

export class JwtRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
