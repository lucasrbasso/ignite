import { Pet, Prisma } from '@prisma/client'

interface PetCharacteristics {
  age: number
  independence: number
  energy: number
}

interface Location {
  state: string
  city: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateWithoutPicturesInput): Promise<Pet>
  // findByCharacteristicsAndLocation(
  //   characteristics: PetCharacteristics,
  //   location: Location,
  // ): Promise<Pet[] | null>
  // findByLocation(location: Location): Promise<Pet[] | null>
  // findById(id: string): Promise<Pet | null>
}
