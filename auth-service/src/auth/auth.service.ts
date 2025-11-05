import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { JwtResponseDto } from './dto/jwt-response.dto'
import { RegisterUserDto } from './dto/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)

    if (!user) {
      return null
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password)

    if (isPasswordValid) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(username: string, password: string): Promise<JwtResponseDto> {
    const user = await this.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { username: user.username, sub: user.id }
    const token = this.jwtService.sign(payload)

    return new JwtResponseDto(token)
  }

  async register(registerDto: RegisterUserDto): Promise<any> {
    // Check if user already exists
    const existingUser = await this.usersService.findByUsername(registerDto.userEmail)

    if (existingUser) {
      throw new UnauthorizedException('User already exists')
    }

    // Create new user
    await this.usersService.create(registerDto.userEmail, registerDto.userPassword)

    return { message: 'User registered successfully' }
  }
}
