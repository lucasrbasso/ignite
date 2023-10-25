import { makeShowPetUseCase } from '@/shared/factories/pets/make-show-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = showParamsSchema.parse(request.params)

  const submitPetPictureUseCase = makeShowPetUseCase()
  const { pet } = await submitPetPictureUseCase.execute({
    id: pet_id,
  })

  return reply.status(200).send({
    pet,
  })
}
