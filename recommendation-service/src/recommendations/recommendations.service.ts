import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import neo4j, { Driver, Session } from 'neo4j-driver'
import { WishlistProductDto } from './dto/wishlist.dto'

@Injectable()
export class RecommendationsService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.driver = neo4j.driver(
      this.configService.get('NEO4J_URI', 'bolt://localhost:7687'),
      neo4j.auth.basic(
        this.configService.get('NEO4J_USERNAME', 'neo4j'),
        this.configService.get('NEO4J_PASSWORD', 'AkuCintaNoSQL799124')
      )
    )
  }

  async onModuleDestroy() {
    await this.driver.close()
  }

  private getSession(): Session {
    return this.driver.session()
  }

  async getAllUsers(): Promise<any[]> {
    const session = this.getSession()
    try {
      const result = await session.run('MATCH (u:User) RETURN u')
      return result.records.map((record) => record.get('u').properties)
    } finally {
      await session.close()
    }
  }

  async getAllProducts(): Promise<any[]> {
    const session = this.getSession()
    try {
      const result = await session.run('MATCH (p:Product) RETURN p')
      return result.records.map((record) => record.get('p').properties)
    } finally {
      await session.close()
    }
  }

  async getUserLikes(userName: string = 'Nikhila'): Promise<any[]> {
    const session = this.getSession()
    try {
      const result = await session.run(
        'MATCH (u:User {name:$name})-[:LIKES]->(c:Category) RETURN c',
        { name: userName }
      )
      return result.records.map((record) => record.get('c').properties)
    } finally {
      await session.close()
    }
  }

  async getRecommendations(userName: string = 'Pranee'): Promise<any[]> {
    const session = this.getSession()
    try {
      const result = await session.run(
        'MATCH (u:User {name:$name})-[:LIKES]->(:Category)<-[:BELONGS_TO]-(p:Product) RETURN p',
        { name: userName }
      )
      return result.records.map((record) => record.get('p').properties)
    } finally {
      await session.close()
    }
  }

  async getWishlist(): Promise<any[]> {
    const session = this.getSession()
    try {
      const result = await session.run('MATCH (p:WishlistProduct) RETURN p')
      return result.records.map((record) => record.get('p').properties)
    } finally {
      await session.close()
    }
  }

  async addToWishlist(wishlistDto: WishlistProductDto): Promise<any> {
    const session = this.getSession()
    try {
      await session.run(
        `MERGE (n:WishlistProduct { name: $name, owner: $owner, des: $des })`,
        {
          name: wishlistDto.name,
          owner: wishlistDto.owner,
          des: wishlistDto.des,
        }
      )
      return { message: 'Added to wishlist successfully' }
    } finally {
      await session.close()
    }
  }

  async removeFromWishlist(wishlistDto: WishlistProductDto): Promise<any[]> {
    const session = this.getSession()
    try {
      await session.run('MATCH (p:WishlistProduct {name: $name}) DETACH DELETE p', {
        name: wishlistDto.name,
      })
      // Return updated wishlist
      return this.getWishlist()
    } finally {
      await session.close()
    }
  }
}
