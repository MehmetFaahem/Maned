import { RedisClient } from '.'

export class RedisCache {
  static async get<T>(key: string): Promise<T | null> {
    const data = await RedisClient.get(key)
    return data ? JSON.parse(data) : null
  }

  static async set(
    key: string,
    value: any,
    expiresInSeconds?: number,
  ): Promise<void> {
    const stringValue = JSON.stringify(value)
    if (expiresInSeconds) {
      await RedisClient.setex(key, expiresInSeconds, stringValue)
    } else {
      await RedisClient.set(key, stringValue)
    }
  }

  static async delete(key: string): Promise<void> {
    await RedisClient.del(key)
  }

  static async clear(): Promise<void> {
    await RedisClient.flushall()
  }
}
