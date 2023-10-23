import { FindByLocationAndCharacteristicsResponseDTO } from '@/dtos/pet/find-by-location-and-characteristics-response.dto'
import { FindByLocationAndCharacteristicsDTO } from '@/dtos/pet/find-by-location-and-characteristics.dto'
import { PetRepository } from '@/repositories/pet-repository'

export class FindByLocationAndCharacteristicsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    characteristics,
    location,
  }: FindByLocationAndCharacteristicsDTO): Promise<FindByLocationAndCharacteristicsResponseDTO> {
    const pets = await this.petsRepository.findByCharacteristicsAndLocation(
      characteristics,
      location,
    )

    return {
      pets,
    }
  }
}
