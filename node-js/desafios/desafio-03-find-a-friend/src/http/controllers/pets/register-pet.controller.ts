import { makeRegisterPetUseCase } from '@/shared/factories/pets/make-register-pet.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const organization_id = request.user.sub

  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.coerce.number(),
    independence: z.coerce.number(),
    energy: z.coerce.number(),
    environment: z.enum(['WIDE', 'SMALL']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    requests: z.array(z.string()),
  })

  const data = registerBodySchema.parse(request.body)
  const registerUseCase = makeRegisterPetUseCase()
  await registerUseCase.execute({
    ...data,
    organization_id,
  })

  return reply.status(201).send()
}
