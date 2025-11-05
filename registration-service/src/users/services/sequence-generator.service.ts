import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DatabaseSequence, DatabaseSequenceDocument } from '../schemas/database-sequence.schema'

@Injectable()
export class SequenceGeneratorService {
  constructor(
    @InjectModel(DatabaseSequence.name)
    private sequenceModel: Model<DatabaseSequenceDocument>,
  ) {}

  async getNextSequence(seqName: string): Promise<number> {
    const sequenceDocument = await this.sequenceModel.findByIdAndUpdate(
      seqName,
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    )

    return sequenceDocument.seq
  }
}
