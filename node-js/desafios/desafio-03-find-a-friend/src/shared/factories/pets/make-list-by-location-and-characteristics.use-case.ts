import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { ListByLocationAndCharacteristicsUseCase } from '@/use-cases/pets/list-by-location-and-characteristics.use-case'

export function makeListByLocationAndCharacteristicsUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new ListByLocationAndCharacteristicsUseCase(petsRepository)

  return useCase
}
