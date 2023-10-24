import { makeSubmitPetPictureUseCase } from '@/shared/factories/pictures/make-submit-pet-picture.use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function submit(request: FastifyRequest, reply: FastifyReply) {
  const submitPictureParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = submitPictureParamsSchema.parse(request.params)

  const fileNames = request.files.map((file) => file.filename!)

  const submitPetPictureUseCase = makeSubmitPetPictureUseCase()
  await submitPetPictureUseCase.execute({
    pet_id,
    picture_filenames: fileNames,
  })

  return reply.status(201).send()
}
