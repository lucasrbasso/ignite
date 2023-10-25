import { FastifyInstance } from 'fastify'
import { submit } from '../controllers/pictures/submit-pet-picture.controller'
import multer from 'fastify-multer'
import { uploadConfig } from '@/config/upload'
import { verifyJwt } from '../middlewares/verify-jwt'

const upload = multer(uploadConfig.multer)

export async function pictureRoutes(app: FastifyInstance) {
  app.post(
    '/pictures/:pet_id',
    { onRequest: [verifyJwt], preHandler: upload.array('files') },
    submit,
  )
}
