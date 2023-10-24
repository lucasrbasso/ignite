import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'

import { env } from './env'
import { errorHandler } from './errors/handler'
import { uploadConfig } from './config/upload'

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyStatic, {
  root: uploadConfig.uploadsFolder,
  prefix: '/files',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '',
  },
})

app.setErrorHandler(errorHandler)
