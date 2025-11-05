import { Injectable, OnModuleInit, OnModuleDestroy, BadRequestException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { Item } from './entities/item.entity'
import { CreateItemDto } from './dto/item.dto'

@Injectable()
export class ItemsService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis
  private readonly REDIS_KEY = 'ITEM'

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

  async getAllItems(): Promise<Record<number, Item>> {
    const items = await this.redisClient.hgetall(this.REDIS_KEY)
    const result: Record<number, Item> = {}

    for (const [key, value] of Object.entries(items)) {
      result[parseInt(key)] = JSON.parse(value)
    }

    return result
  }

  async getItem(itemId: number): Promise<Item> {
    const itemJson = await this.redisClient.hget(this.REDIS_KEY, itemId.toString())

    if (!itemJson) {
      throw new NotFoundException('Item not found')
    }

    return JSON.parse(itemJson)
  }

  async addItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = new Item(createItemDto)

    await this.redisClient.hset(this.REDIS_KEY, item.itemId.toString(), JSON.stringify(item))

    return item
  }

  async updateItem(itemId: number, itemCurrentBid: number, noOfDaysNeeded: number): Promise<Item> {
    const item = await this.getItem(itemId)

    // Validate bidding conditions
    // 1. Days needed must not exceed available rental period
    if (noOfDaysNeeded > item.numberOfDaysForRent) {
      throw new BadRequestException(
        `Number of days needed (${noOfDaysNeeded}) cannot exceed available rental days (${item.numberOfDaysForRent})`
      )
    }

    // 2. Bid must be at least latestBid + 100
    const minimumAllowedBid = item.latestBid + 100
    if (itemCurrentBid < minimumAllowedBid) {
      throw new BadRequestException(
        `Current bid (${itemCurrentBid}) must be at least ${minimumAllowedBid} (latest bid + 100)`
      )
    }

    // Update item with new bid
    item.numberOfDaysNeeded = noOfDaysNeeded
    item.latestBid = itemCurrentBid
    item.minimumBiddingAmount = itemCurrentBid + 100
    item.yourBid = itemCurrentBid

    await this.redisClient.hset(this.REDIS_KEY, itemId.toString(), JSON.stringify(item))

    return item
  }

  async deleteItem(itemId: number): Promise<void> {
    const result = await this.redisClient.hdel(this.REDIS_KEY, itemId.toString())

    if (result === 0) {
      throw new NotFoundException('Item not found')
    }
  }
}
