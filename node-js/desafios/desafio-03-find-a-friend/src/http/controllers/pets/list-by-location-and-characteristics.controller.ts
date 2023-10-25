import { makeListByLocationAndCharacteristicsUseCase } from '@/shared/factories/pets/make-list-by-location-and-characteristics.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const listQuerySchema = z.object({
    state: z.string(),
    city: z.string(),
    age: z.coerce.number().optional(),
    independence: z.coerce.number().optional(),
    energy: z.coerce.number().optional(),
  })

  const { city, state, age, independence, energy } = listQuerySchema.parse(
    request.query,
  )

  const listPetsByLocationAndCharacteristicsUseCase =
    makeListByLocationAndCharacteristicsUseCase()
  const { pets } = await listPetsByLocationAndCharacteristicsUseCase.execute({
    location: {
      city,
      state,
    },
    characteristics: {
      age,
      independence,
      energy,
    },
  })

  return reply.status(200).send({ pets })
}
