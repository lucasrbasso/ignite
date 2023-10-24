import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet.repository'
import { RegisterPetUseCase } from '@/use-cases/pets/register-pet.use-case'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new RegisterPetUseCase(petsRepository)

  return useCase
}
