import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class RentItems {
  @Prop({ required: true })
  itemid: number

  @Prop({ required: true })
  itemName: string

  @Prop({ required: true })
  itemCategory: string

  @Prop({ required: true })
  itemQuantity: number

  @Prop({ required: true })
  itemDescription: string

  @Prop({ required: true })
  itemDurationOfRent: number

  @Prop({ required: true })
  baseRent: number
}

export const RentItemsSchema = SchemaFactory.createForClass(RentItems)
