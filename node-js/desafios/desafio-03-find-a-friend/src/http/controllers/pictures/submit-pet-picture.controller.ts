import { makeRegisterPetUseCase } from '@/shared/factories/pets/make-register-pet.use-case'
import { makeSubmitPetPictureUseCase } from '@/shared/factories/pictures/make-submit-pet-picture.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

interface MulterRequest extends FastifyRequest {
  file: any
}

export async function submit(request: MulterRequest, reply: FastifyReply) {
  const submitPictureParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = submitPictureParamsSchema.parse(request.params)

  const submitPetPictureUseCase = makeSubmitPetPictureUseCase()
  await submitPetPictureUseCase.execute({
    pet_id,
    picture_filenames: request.file.filename,
  })

  return reply.status(201).send()
}
