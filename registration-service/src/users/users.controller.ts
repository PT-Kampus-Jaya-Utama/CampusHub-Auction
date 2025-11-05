import { Controller, Post, Get, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RentItemsDto } from './dto/rent-items.dto'

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async saveUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.saveUser(createUserDto)
  }

  @Post('rentItems/:email')
  async saveItems(
    @Param('email') email: string,
    @Body(ValidationPipe) rentItemsDto: RentItemsDto,
  ) {
    return this.usersService.saveItems(rentItemsDto, email)
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @Get('getRentItems/:email')
  async getRentItems(@Param('email') email: string) {
    return this.usersService.getRentItems(email)
  }

  @Put('update')
  async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto)
  }

  @Put('updateRentItems/:email/:id')
  async updateRentItems(
    @Param('email') email: string,
    @Param('id') id: string,
    @Body(ValidationPipe) rentItemsDto: RentItemsDto,
  ) {
    return this.usersService.updateRentItems(rentItemsDto, email, parseInt(id))
  }

  @Delete('delete/:email')
  async deleteUser(@Param('email') email: string) {
    return this.usersService.deleteUser(email)
  }

  @Delete('deleteRentItems/:email/:id')
  async deleteItems(@Param('email') email: string, @Param('id') id: string) {
    return this.usersService.deleteItems(email, parseInt(id))
  }
}
