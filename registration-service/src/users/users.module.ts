import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User, UserSchema } from './schemas/user.schema'
import { DatabaseSequence, DatabaseSequenceSchema } from './schemas/database-sequence.schema'
import { SequenceGeneratorService } from './services/sequence-generator.service'
import { KafkaModule } from '../kafka/kafka.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: DatabaseSequence.name, schema: DatabaseSequenceSchema },
    ]),
    KafkaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, SequenceGeneratorService],
  exports: [UsersService],
})
export class UsersModule {}
