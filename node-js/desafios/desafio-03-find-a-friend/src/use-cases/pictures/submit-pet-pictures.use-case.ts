import { PetNotFoundError } from '@/errors/pet/pet-not-found'
import { PetRepository } from '@/repositories/pet-repository'
import { PictureRepository } from '@/repositories/picture-repository'
import { StorageProvider } from '@/shared/providers/storage-provider/models/storage-provider'
import { getPictureUrl } from '@/utils/get-picture-url'

interface Request {
  pet_id: string
  picture_filenames: string[]
}

export class SubmitPetPicturesUseCase {
  constructor(
    private petRepository: PetRepository,
    private pictureRepository: PictureRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ pet_id, picture_filenames }: Request): Promise<void> {
    const pet = await this.petRepository.findById(pet_id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    for await (const picture of picture_filenames) {
      console.log(picture)

      const filename = await this.storageProvider.saveFile(picture)
      await this.pictureRepository.create({
        image_url: getPictureUrl(filename) || '',
        pet_id,
      })
    }
  }
}
