import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.redisClient = new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
    })
  }

  onModuleDestroy() {
    this.redisClient.disconnect()
  }

  async findByUsername(username: string): Promise<User | null> {
    const userJson = await this.redisClient.get(`user:${username}`)
    if (!userJson) {
      return null
    }
    return JSON.parse(userJson)
  }

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      createdAt: new Date(),
    }

    await this.redisClient.set(`user:${username}`, JSON.stringify(user))

    return user
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}
