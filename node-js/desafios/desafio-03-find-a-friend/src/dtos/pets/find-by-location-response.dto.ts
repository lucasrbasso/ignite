import { Pet } from '@prisma/client'

export interface FindByLocationResponseDTO {
  pets: Pet[]
}
