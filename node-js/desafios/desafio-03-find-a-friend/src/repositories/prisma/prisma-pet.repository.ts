import { Prisma } from '@prisma/client'
import { Location, PetCharacteristics, PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateWithoutPicturesInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findByCharacteristicsAndLocation(
    characteristics: PetCharacteristics,
    location: Location,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        ...characteristics,
        Organization: {
          city: location.city,
          state: location.state,
        },
      },
    })

    return pets
  }

  async findByLocation(location: Location) {
    const pets = await prisma.pet.findMany({
      where: {
        Organization: {
          city: location.city,
          state: location.state,
        },
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
