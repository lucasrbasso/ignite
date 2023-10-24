import { FastifyInstance } from 'fastify'
import { submit } from '../controllers/pictures/submit-pet-picture.controller'
import multer from 'fastify-multer'
import { uploadConfig } from '@/config/upload'

const upload = multer(uploadConfig.multer)

export async function pictureRoutes(app: FastifyInstance) {
  app.post('/pictures/:pet_id', { preHandler: upload.array('files') }, submit)
}
