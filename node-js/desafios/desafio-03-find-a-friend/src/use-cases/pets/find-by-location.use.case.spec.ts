import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { FindByLocationUseCase } from './find-by-location.use.case'

let petRepository: InMemoryPetRepository
let sut: FindByLocationUseCase

describe('Find by Location Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new FindByLocationUseCase(petRepository)
  })

  it('should be able to find by location', async () => {
    const { organizationLocationClose, organizationLocationFar } =
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
      name: 'Alfred the farthest dog',
      about: 'Good dog',
      age: 2,
      independence: 1,
      energy: 4,
      organization_id: organizationLocationFar.id,
      environment: 'SMALL',
      size: 'MEDIUM',
      requests: ['Large garden', 'Good food'],
    })

    const { pets } = await sut.execute({ city: 'Poços de Caldas', state: 'MG' })

    expect(pets).toEqual([
      expect.objectContaining({ name: 'Alfred the closest dog' }),
    ])
  })
})
