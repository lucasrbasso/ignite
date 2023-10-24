import { ShowPetDTO } from '@/dtos/pets/show-pet.dto'
import { ShowPetResponseDTO } from '@/dtos/pets/show-pet.response.dto'
import { PetNotFoundError } from '@/errors/pet/pet-not-found'
import { PetRepository } from '@/repositories/pet-repository'

export class ShowPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: ShowPetDTO): Promise<ShowPetResponseDTO> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
