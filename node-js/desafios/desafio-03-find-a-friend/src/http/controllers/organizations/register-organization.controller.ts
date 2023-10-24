import { makeRegisterOrganizationUseCase } from '@/shared/factories/organizations/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
    street_number: z.string(),
    phone_number: z.string(),
    password: z.string().min(6),
  })

  const data = registerBodySchema.parse(request.body)
  const registerUseCase = makeRegisterOrganizationUseCase()

  await registerUseCase.execute(data)

  return reply.status(201).send()
}
