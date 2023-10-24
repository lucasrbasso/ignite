import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { ShowPetUseCase } from '@/use-cases/pets/show-pet.use-case'

export function makeShowPetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new ShowPetUseCase(petsRepository)

  return useCase
}
