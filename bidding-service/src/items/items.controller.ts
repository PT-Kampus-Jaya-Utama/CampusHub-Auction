import { Controller, Get, Post, Put, Param, Body, ValidationPipe, ParseIntPipe, Headers } from '@nestjs/common'
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/item.dto'

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('getAllItems')
  async getAllItems() {
    return this.itemsService.getAllItems()
  }

  @Get('item/:itemId')
  async getItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemsService.getItem(itemId)
  }

  @Post('addItem')
  async addItem(@Body(ValidationPipe) createItemDto: CreateItemDto, @Headers() headers) {
    const item = await this.itemsService.addItem(createItemDto)
    return {
      message: 'Item added successfully',
      headers: { Location: `/item/${item.itemId}` },
      item,
    }
  }

  @Put('updateItem/:itemId/:itemCurrentBid/:noOfDaysNeeded')
  async updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Param('itemCurrentBid', ParseIntPipe) itemCurrentBid: number,
    @Param('noOfDaysNeeded', ParseIntPipe) noOfDaysNeeded: number,
  ) {
    return this.itemsService.updateItem(itemId, itemCurrentBid, noOfDaysNeeded)
  }
}
