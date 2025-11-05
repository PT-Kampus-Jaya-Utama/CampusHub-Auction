import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type DatabaseSequenceDocument = DatabaseSequence & Document

@Schema({ collection: 'database_sequences' })
export class DatabaseSequence {
  @Prop({ required: true })
  _id: string

  @Prop({ required: true })
  seq: number
}

export const DatabaseSequenceSchema = SchemaFactory.createForClass(DatabaseSequence)
