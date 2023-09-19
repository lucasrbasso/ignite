import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

import { UserAlreadyExistsError } from './use-cases/errors/user-already-exists-error'
import { InvalidCredentialsError } from './use-cases/errors/invalid-credentials-error'

export const app = fastify()
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(400).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
