import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { PrismaPictureRepository } from '@/repositories/prisma/prisma-picture.repository'
import { StorageProvider } from '@/shared/providers/storage-provider'
import { SubmitPetPicturesUseCase } from '@/use-cases/pictures/submit-pet-pictures.use-case'

export function makeSubmitPetPictureUseCase() {
  const petsRepository = new PrismaPetRepository()
  const picturesRepository = new PrismaPictureRepository()
  const storageProvider = new StorageProvider()
  const useCase = new SubmitPetPicturesUseCase(
    petsRepository,
    picturesRepository,
    storageProvider,
  )

  return useCase
}
