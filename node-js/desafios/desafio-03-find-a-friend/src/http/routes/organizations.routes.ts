import { FastifyInstance } from 'fastify'
import { register } from '../controllers/organizations/register-organization.controller'
import { refresh } from '../controllers/organizations/refresh.controller'
import { authenticate } from '../controllers/organizations/authenticate.controller'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.post('/organizations', register)
}
