import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'

import { env } from './env'
import { errorHandler } from './errors/handler'
import { uploadConfig } from './config/upload'
import { petRoutes } from './http/routes/pets.routes'
import { organizationRoutes } from './http/routes/organizations.routes'
import { pictureRoutes } from './http/routes/pictures.routes'
import multer from 'fastify-multer'

export const app = fastify()

app.register(multer.contentParser)
app.register(fastifyCookie)
app.register(fastifyStatic, {
  root: uploadConfig.uploadsFolder,
  prefix: '/files',
})

app.register(petRoutes)
app.register(organizationRoutes)
app.register(pictureRoutes)

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
