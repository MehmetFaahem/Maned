import { ReadStream } from 'fs'
import { ZodType } from 'zod'
import {
  OpenaiGenerateTextOptions,
  OpenaiProvider,
} from './providers/openai/openai.provider'
import { RedisCache } from '~/core/configuration/redis/cache'

class Service {
  private openai = new OpenaiProvider()
  private CACHE_TTL = 3600 // 1 hour

  async generateText(options: OpenaiGenerateTextOptions): Promise<string> {
    const cacheKey = `ai:text:${JSON.stringify(options)}`

    // Try to get from cache first
    const cached = await RedisCache.get<string>(cacheKey)
    if (cached) {
      return cached
    }

    // Generate new response
    const result = await this.openai.generateText(options)

    // Cache the result
    await RedisCache.set(cacheKey, result, this.CACHE_TTL)

    return result
  }

  async generateJson<SchemaType extends ZodType>(
    instruction: string,
    content: string,
    schema: SchemaType,
    attachmentUrls?: string[],
  ) {
    return this.openai.generateJson<SchemaType>(
      instruction,
      content,
      schema,
      attachmentUrls,
    )
  }

  async generateImage(prompt: string): Promise<string> {
    return this.openai.generateImage(prompt)
  }

  async fromAudioToText(readStream: ReadStream): Promise<string> {
    return this.openai.fromAudioToText(readStream)
  }

  async fromTextToAudio(text: string): Promise<Buffer> {
    return this.openai.fromTextToAudio(text)
  }

  isActive(): boolean {
    return this.openai.isActive()
  }
}

export const AiService = new Service()
