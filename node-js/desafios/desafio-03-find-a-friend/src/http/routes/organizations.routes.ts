import { FastifyInstance } from 'fastify'
import { register } from '../controllers/organizations/register-organization.controller'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
}
