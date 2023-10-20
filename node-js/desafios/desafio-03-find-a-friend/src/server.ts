import { app } from './app'
import { env } from './env'
import { logger } from './utils/logger'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    logger.info(`HTTP Server Running! Listening on port ${env.PORT}.`)
  })
