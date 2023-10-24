import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet.repository'
import { SubmitPetPicturesUseCase } from './submit-pet-pictures.use-case'
import { InMemoryPictureRepository } from '@/repositories/in-memory/in-memory-picture.repository'
import InMemoryDiskProvider from '@/shared/providers/storage-provider/in-memory/disk-storage-provider'
import { env } from '@/env'

let petRepository: InMemoryPetRepository
let pictureRepository: InMemoryPictureRepository
let storageProvider: InMemoryDiskProvider

let sut: SubmitPetPicturesUseCase

describe('Show Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    pictureRepository = new InMemoryPictureRepository()
    storageProvider = new InMemoryDiskProvider()

    sut = new SubmitPetPicturesUseCase(
      petRepository,
      pictureRepository,
      storageProvider,
    )
  })

  it('should be able to add pictures to a pet by id', async () => {
    const pet = await petRepository.create({
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

    await sut.execute({
      pet_id: pet.id,
      picture_filenames: ['picture1.jpg', 'picture2.jpg'],
    })

    const pictures = await pictureRepository.findByPetId(pet.id)

    expect(pictures).toEqual([
      expect.objectContaining({
        image_url: `${env.APP_API_URL}/files/picture1.jpg`,
      }),
      expect.objectContaining({
        image_url: `${env.APP_API_URL}/files/picture2.jpg`,
      }),
    ])
  })
})
