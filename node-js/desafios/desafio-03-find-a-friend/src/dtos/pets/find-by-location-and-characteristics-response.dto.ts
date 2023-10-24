import { Pet } from '@prisma/client'

export interface FindByLocationAndCharacteristicsResponseDTO {
  pets: Pet[]
}
