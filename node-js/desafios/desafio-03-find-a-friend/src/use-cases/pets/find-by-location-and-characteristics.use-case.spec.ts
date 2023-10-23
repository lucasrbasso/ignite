import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { FindByLocationAndCharacteristicsUseCase } from './find-by-location-and-characteristics.use-case'

let petRepository: InMemoryPetRepository
let sut: FindByLocationAndCharacteristicsUseCase

describe('Find by Location and Characteristics Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new FindByLocationAndCharacteristicsUseCase(petRepository)
  })

  it('should be able to find by location and characteristics', async () => {
    const { organizationLocationClose } =
      await petRepository.helpGenerateOrganization()

    await petRepository.create({
      name: 'Alfred the closest dog',
      about: 'Good dog',
      age: 2,
      independence: 1,
      energy: 4,
      organization_id: organizationLocationClose.id,
      environment: 'SMALL',
      size: 'MEDIUM',
      requests: ['Large garden', 'Good food'],
    })

    await petRepository.create({
      name: 'Garfield the closest cat',
      about: 'Good cat',
      age: 1,
      independence: 4,
      energy: 1,
      organization_id: organizationLocationClose.id,
      environment: 'WIDE',
      size: 'SMALL',
      requests: ['Large garden', 'Good food'],
    })

    const { pets } = await sut.execute({
      characteristics: { age: 2 },
      location: {
        city: organizationLocationClose.city,
        state: organizationLocationClose.state,
      },
    })

    expect(pets).toEqual([
      expect.objectContaining({ name: 'Alfred the closest dog' }),
    ])
  })

  it('should be able to find many pets by location and many characteristics', async () => {
    const { organizationLocationClose } =
      await petRepository.helpGenerateOrganization()

    await petRepository.create({
      name: 'Alfred the closest dog',
      about: 'Good dog',
      age: 2,
      independence: 4,
      energy: 4,
      organization_id: organizationLocationClose.id,
      environment: 'SMALL',
      size: 'MEDIUM',
      requests: ['Large garden', 'Good food'],
    })

    await petRepository.create({
      name: 'Garfield the closest cat',
      about: 'Good cat',
      age: 2,
      independence: 4,
      energy: 1,
      organization_id: organizationLocationClose.id,
      environment: 'WIDE',
      size: 'SMALL',
      requests: ['Large garden', 'Good food'],
    })

    const { pets } = await sut.execute({
      characteristics: { age: 2, independence: 4 },
      location: {
        city: organizationLocationClose.city,
        state: organizationLocationClose.state,
      },
    })

    expect(pets).toEqual([
      expect.objectContaining({ name: 'Alfred the closest dog' }),
      expect.objectContaining({ name: 'Garfield the closest cat' }),
    ])
  })
})
