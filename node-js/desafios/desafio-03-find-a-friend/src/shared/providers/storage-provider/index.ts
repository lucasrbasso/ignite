import DiskStorageProvider from './implementations/disk-storage-provider'
import S3StorageProvider from './implementations/s3-storage-provider'
import { uploadConfig } from '@/config/upload'

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
}

export const StorageProvider = providers[uploadConfig.driver]
