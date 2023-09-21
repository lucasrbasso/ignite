import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym.use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      description: 'any',
      latitude: -21.7947832,
      longitude: -46.6029821,
      phone: null,
      title: 'Test gym',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
