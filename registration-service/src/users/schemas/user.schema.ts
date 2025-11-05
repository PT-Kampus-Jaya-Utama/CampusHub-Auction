import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { RentItems, RentItemsSchema } from './rent-items.schema'
import { BiddedItems, BiddedItemsSchema } from './bidded-items.schema'

export type UserDocument = User & Document

@Schema({ collection: 'user' })
export class User {
  @Prop({ required: true, unique: true })
  userEmail: string

  @Prop({ required: true })
  userName: string

  @Prop({ required: true })
  userPhoneNumber: string

  @Prop({ required: true })
  userGender: string

  @Prop({ required: true })
  userAadharNumber: string

  @Prop({ required: true })
  userPassword: string

  @Prop({ type: [RentItemsSchema], default: [] })
  rentItems: RentItems[]

  @Prop({ type: [BiddedItemsSchema], default: [] })
  biddedItems: BiddedItems[]
}

export const UserSchema = SchemaFactory.createForClass(User)
