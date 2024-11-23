import Redis from 'ioredis'

const singleton = globalThis as unknown as {
  redis: Redis | undefined
}

if (!singleton.redis) {
  singleton.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

  singleton.redis.on('error', error => {
    console.error('Redis connection error:', error)
  })

  singleton.redis.on('connect', () => {
    console.log('Redis connected successfully')
  })
}

export const RedisClient = singleton.redis
