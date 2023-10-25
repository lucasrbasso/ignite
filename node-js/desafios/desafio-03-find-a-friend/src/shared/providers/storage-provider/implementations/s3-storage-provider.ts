import fs from 'fs'
import path from 'path'
import mime from 'mime'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

import { uploadConfig } from '@/config/upload'
import { StorageProvider } from '../models/storage-provider'
import { AWSIntegrationError } from '@/errors/aws/aws-integration-error'
import { InvalidMimeType } from '@/errors/mime/invalid-mime-type'

class DiskStorageProvider implements StorageProvider {
  private client: S3Client

  constructor() {
    this.client = new S3Client({ region: 'us-east-2' })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    console.log('original path: ', originalPath)
    console.log(mime.getType(originalPath))

    const ContentType = mime.getType(originalPath)

    if (!ContentType && ContentType !== 'image/jpeg') {
      await fs.promises.unlink(originalPath)
      throw new InvalidMimeType()
    }

    const fileContent = await fs.promises.readFile(originalPath)

    const command = new PutObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    })

    try {
      await this.client.send(command)
    } catch (err) {
      await fs.promises.unlink(originalPath)
      throw new AWSIntegrationError()
    }

    await fs.promises.unlink(originalPath)
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    })

    try {
      await this.client.send(command)
    } catch (err) {
      throw new AWSIntegrationError()
    }
  }
}

export default DiskStorageProvider
