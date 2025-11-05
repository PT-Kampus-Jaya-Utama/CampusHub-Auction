import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false })
export class BiddedItems {
  @Prop({ required: true })
  itemid: string

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

  @Prop({ required: true })
  ownerName: string

  @Prop({ required: true })
  ownerEmail: string

  @Prop({ required: true })
  biddedRent: number
}

export const BiddedItemsSchema = SchemaFactory.createForClass(BiddedItems)
