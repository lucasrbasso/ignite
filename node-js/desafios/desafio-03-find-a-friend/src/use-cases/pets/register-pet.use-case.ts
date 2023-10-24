import { RegisterPetResponseDTO } from '@/dtos/pets/register-pet-response.dto'
import { RegisterPetDTO } from '@/dtos/pets/register-pet.dto'
import { PetRepository } from '@/repositories/pet-repository'

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: RegisterPetDTO): Promise<RegisterPetResponseDTO> {
    const pet = await this.petRepository.create(data)

    return {
      pet,
    }
  }
}
