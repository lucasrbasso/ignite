import fs from 'fs'
import path from 'path'

import { StorageProvider } from '../models/storage-provider'
import { uploadConfig } from '@/config/upload'

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

export default DiskStorageProvider
