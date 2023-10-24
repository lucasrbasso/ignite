import { logger } from '@/utils/logger'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  STORAGE_DRIVER: z.enum(['disk', 'storage']).default('disk'),
  APP_API_URL: z.string().default('http://localhost:3333'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  logger.error(
    'Invalid environment variables. Please provider all environments listed in .env.example',
    _env.error.format(),
  )

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
