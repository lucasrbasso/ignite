import { FastifyInstance } from 'fastify'
import { register } from '../controllers/pets/register-pet.controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', register)
}
