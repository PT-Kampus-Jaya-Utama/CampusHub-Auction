import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RentItemsDto } from './dto/rent-items.dto'
import { SequenceGeneratorService } from './services/sequence-generator.service'
import { KafkaProducerService } from '../kafka/kafka-producer.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private sequenceGenerator: SequenceGeneratorService,
    private kafkaProducer: KafkaProducerService,
  ) {}

  async saveUser(createUserDto: CreateUserDto): Promise<any> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ userEmail: createUserDto.userEmail })

    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    // Initialize empty arrays for rentItems and biddedItems
    const newUser = new this.userModel({
      ...createUserDto,
      rentItems: [],
      biddedItems: [],
    })

    const savedUser = await newUser.save()

    // Publish user-created event to Kafka
    await this.kafkaProducer.publishEvent('user-events', {
      event: 'user-created',
      data: savedUser,
    })

    return { message: 'User registered successfully', user: savedUser }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
    const { userEmail, ...updateData } = updateUserDto

    const user = await this.userModel.findOne({ userEmail })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    Object.assign(user, updateData)
    const updatedUser = await user.save()

    // Publish user-updated event to Kafka
    await this.kafkaProducer.publishEvent('user-events', {
      event: 'user-updated',
      data: updatedUser,
    })

    return { message: 'User updated successfully', user: updatedUser }
  }

  async deleteUser(email: string): Promise<any> {
    const result = await this.userModel.deleteOne({ userEmail: email })

    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found')
    }

    return { message: 'User deleted successfully' }
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ userEmail: email })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async saveItems(rentItemsDto: RentItemsDto, email: string): Promise<any> {
    const user = await this.getUserByEmail(email)

    // Generate sequence ID for the new rent item
    const itemId = await this.sequenceGenerator.getNextSequence('rentItems_sequence')

    const newItem = {
      itemid: itemId,
      ...rentItemsDto,
    }

    user.rentItems.push(newItem)
    const updatedUser = await user.save()

    // Publish rent-item-added event to Kafka
    await this.kafkaProducer.publishEvent('user-events', {
      event: 'rent-item-added',
      data: { email, item: newItem },
    })

    return { message: 'Rent item added successfully', user: updatedUser }
  }

  async getRentItems(email: string): Promise<any> {
    const user = await this.getUserByEmail(email)
    return user.rentItems
  }

  async updateRentItems(rentItemsDto: RentItemsDto, email: string, itemId: number): Promise<any> {
    const user = await this.getUserByEmail(email)

    const itemIndex = user.rentItems.findIndex((item) => item.itemid === itemId)

    if (itemIndex === -1) {
      throw new NotFoundException('Rent item not found')
    }

    // Update itemDurationOfRent
    user.rentItems[itemIndex].itemDurationOfRent = rentItemsDto.itemDurationOfRent

    const updatedUser = await user.save()

    // Publish rent-item-updated event to Kafka
    await this.kafkaProducer.publishEvent('user-events', {
      event: 'rent-item-updated',
      data: { email, itemId, update: rentItemsDto },
    })

    return { message: 'Rent item updated successfully', user: updatedUser }
  }

  async deleteItems(email: string, itemId: number): Promise<any> {
    const user = await this.getUserByEmail(email)

    const initialLength = user.rentItems.length
    user.rentItems = user.rentItems.filter((item) => item.itemid !== itemId)

    if (user.rentItems.length === initialLength) {
      throw new NotFoundException('Rent item not found')
    }

    await user.save()

    return { message: 'Rent item deleted successfully' }
  }
}
