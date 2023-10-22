import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateWithoutPicturesInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      independence: data.independence,
      energy: data.energy,
      organization_id: data.organization_id || null,
      environment: data.environment,
      size: data.size,
      requests: data.requests as string[],
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }
}
