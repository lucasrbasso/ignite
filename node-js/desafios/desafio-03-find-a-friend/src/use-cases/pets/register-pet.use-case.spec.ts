import { expect, describe, it, beforeEach } from 'vitest'

import { RegisterPetUseCase } from './register-pet.use-case'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'

let petRepository: InMemoryPetRepository
let sut: RegisterPetUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(petRepository)
  })

  it('should be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Alfred',
      about: 'Good dog',
      age: 2,
      independence: 1,
      energy: 4,
      organization_id: '1231234',
      environment: 'SMALL',
      size: 'MEDIUM',
      requests: ['Large garden', 'Good food'],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
