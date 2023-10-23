import { FindByLocationDTO } from '@/dtos/pet/find-by-location.dto'
import { FindByLocationResponseDTO } from '@/dtos/pet/find-by-location-response.dto'
import { PetRepository } from '@/repositories/pet-repository'

export class FindByLocationUseCase {
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
