import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { ListByLocationUseCase } from '@/use-cases/pets/list-by-location.use.case'

export function makeListByLocationUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new ListByLocationUseCase(petsRepository)

  return useCase
}
