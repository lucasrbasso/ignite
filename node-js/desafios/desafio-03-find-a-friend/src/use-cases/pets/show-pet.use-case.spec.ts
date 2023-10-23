import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { ShowPetUseCase } from './show-pet.use-case'

let petRepository: InMemoryPetRepository
let sut: ShowPetUseCase

describe('Show Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new ShowPetUseCase(petRepository)
  })

  it('should be able to find a pet by id', async () => {
    const createdPet = await petRepository.create({
      name: 'Alfred the closest dog',
      about: 'Good dog',
      age: 2,
      independence: 1,
      energy: 4,
      organization_id: '121245',
      environment: 'SMALL',
      size: 'MEDIUM',
      requests: ['Large garden', 'Good food'],
    })

    const { pet } = await sut.execute({ id: createdPet.id })

    expect(pet.id).toBe(createdPet.id)
    expect(pet.name).toBe(createdPet.name)
  })
})
