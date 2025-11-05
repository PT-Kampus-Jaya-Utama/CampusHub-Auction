import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, Producer } from 'kafkajs'

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka
  private producer: Producer

  constructor(private configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: this.configService.get('KAFKA_CLIENT_ID', 'registration-service'),
      brokers: [this.configService.get('KAFKA_BROKERS', 'localhost:9092')],
    })
    this.producer = this.kafka.producer()
  }

  async onModuleInit() {
    await this.producer.connect()
    console.log('Kafka Producer connected')
  }

  async onModuleDestroy() {
    await this.producer.disconnect()
  }

  async publishEvent(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      })
      console.log(`Event published to topic ${topic}:`, message)
    } catch (error) {
      console.error('Error publishing event:', error)
    }
  }
}
