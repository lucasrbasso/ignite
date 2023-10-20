import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { logger } from '@/utils/logger'
import { env } from '@/env'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    logger.error(`path=${request.url}` + `${error}`)
  } else {
    logger.error(`path=${request.url}` + `${error}`)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
