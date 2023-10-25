import { FastifyInstance } from 'fastify'
import { register } from '../controllers/pets/register-pet.controller'
import { show } from '../controllers/pets/show-pet.controller'
import { list } from '../controllers/pets/list-by-location-and-characteristics.controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, register)
  app.get('/pets', list)
  app.get('/pets/:pet_id', show)
}
