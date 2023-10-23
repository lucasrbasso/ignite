import { Pet, Prisma } from '@prisma/client'

export interface PetCharacteristics {
  age?: number
  independence?: number
  energy?: number
}

export interface Location {
  state: string
  city: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateWithoutPicturesInput): Promise<Pet>
  findByCharacteristicsAndLocation(
    characteristics: PetCharacteristics,
    location: Location,
  ): Promise<Pet[]>
  findByLocation(location: Location): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
