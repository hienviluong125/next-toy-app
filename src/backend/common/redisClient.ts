import uptash from '@upstash/redis'

export default uptash(
  process.env.UPSTASH_REDIS_REST_URL,
  process.env.UPSTASH_REDIS_REST_TOKEN
)
