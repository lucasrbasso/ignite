import { FindByLocationDTO } from '@/dtos/pets/find-by-location.dto'
import { FindByLocationResponseDTO } from '@/dtos/pets/find-by-location-response.dto'
import { PetRepository } from '@/repositories/pet-repository'

export class ListByLocationUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute(
    location: FindByLocationDTO,
  ): Promise<FindByLocationResponseDTO> {
    const pets = await this.petsRepository.findByLocation(location)

    return {
      pets,
    }
  }
}
