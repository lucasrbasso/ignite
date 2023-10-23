import { Organization, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Location, PetCharacteristics, PetRepository } from '../pet-repository'
import { InMemoryOrganizationRepository } from './in-memory-organization.repository'
interface HelperGenerateOrganization {
  organizationLocationClose: Organization
  organizationLocationFar: Organization
}
export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []
  private organizationRepository = new InMemoryOrganizationRepository()

  filterPets(query: Partial<Pet>): Pet[] {
    return this.items.filter((pet) => {
      for (const key of Object.keys(query)) {
        if (pet[key as keyof Pet] !== query[key as keyof Pet]) {
          return false
        }
      }
      return true
    })
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async helpGenerateOrganization(): Promise<HelperGenerateOrganization> {
    const organizationLocationClose = await this.organizationRepository.create({
      name: 'any-name',
      email: 'john@doe.com',
      street_number: '30',
      state: 'MG',
      city: 'Poços de Caldas',
      cep: '37704319',
      phone_number: '5535991401637',
      password_hash: 'hashed',
    })

    const organizationLocationFar = await this.organizationRepository.create({
      name: 'any-name',
      email: 'john@doe.com',
      street_number: '30',
      state: 'SP',
      city: 'São Paulo',
      cep: '37704319',
      phone_number: '5535991401637',
      password_hash: 'hashed',
    })

    return { organizationLocationClose, organizationLocationFar }
  }

  async create(
    data: Prisma.PetUncheckedCreateWithoutPicturesInput,
    org?: Organization,
  ) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      independence: data.independence,
      energy: data.energy,
      organization_id: org?.id || data.organization_id || null,
      environment: data.environment,
      size: data.size,
      requests: data.requests as string[],
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findByLocation(location: Location) {
    const pets: Pet[] = []

    const organizations = this.organizationRepository.items.filter(
      (item) => item.city === location.city && item.state === location.state,
    )

    organizations.forEach((org) => {
      const filteredPets = this.items.filter(
        (pet) => pet.organization_id === org.id,
      )

      filteredPets.forEach((pet) => {
        pets.push(pet)
      })
    })

    return pets
  }

  async findByCharacteristicsAndLocation(
    characteristics: PetCharacteristics,
    location: Location,
  ) {
    const pets: Pet[] = []

    const organizations = this.organizationRepository.items.filter(
      (item) => item.city === location.city && item.state === location.state,
    )

    organizations.forEach((org) => {
      const filteredPets = this.filterPets({
        ...characteristics,
        organization_id: org.id,
      })

      filteredPets.forEach((pet) => {
        pets.push(pet)
      })
    })

    return pets
  }
}
