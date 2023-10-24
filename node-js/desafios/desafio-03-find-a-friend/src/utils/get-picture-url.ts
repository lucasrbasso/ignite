import { uploadConfig } from '@/config/upload'
import { env } from '@/env'

export function getPictureUrl(filename: string): string | null {
  switch (uploadConfig.driver) {
    case 'disk':
      return `${env.APP_API_URL}/files/${filename}`
    case 's3':
      return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${filename}`
    default:
      return null
  }
}
