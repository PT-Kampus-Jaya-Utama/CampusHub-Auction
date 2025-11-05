import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtRequestDto } from './dto/jwt-request.dto'
import { JwtResponseDto } from './dto/jwt-response.dto'
import { RegisterUserDto } from './dto/user.dto'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('authenticate')
  async authenticate(
    @Body(ValidationPipe) credentials: JwtRequestDto,
  ): Promise<JwtResponseDto> {
    return this.authService.login(credentials.username, credentials.password)
  }

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterUserDto): Promise<any> {
    return this.authService.register(registerDto)
  }
}
