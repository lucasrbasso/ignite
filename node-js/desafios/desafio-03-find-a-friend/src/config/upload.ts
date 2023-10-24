import multer from 'fastify-multer'
import crypto from 'crypto'
import path from 'path'
import { StorageEngine } from 'fastify-multer/lib/interfaces'
import { env } from '@/env'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface UploadConfig {
  driver: 's3' | 'disk'
  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }

  config: {
    disk: object
    aws: {
      bucket: string
    }
  }
}

export const uploadConfig = {
  driver: env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'tmp'),
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_BUCKET_NAME,
    },
  },
} as UploadConfig
