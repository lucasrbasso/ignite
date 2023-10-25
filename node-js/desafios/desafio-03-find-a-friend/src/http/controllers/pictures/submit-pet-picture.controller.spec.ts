import request from 'supertest'
import { app } from '@/app'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Submit pet picture (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to submit pet pictures', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Maçã',
        about: 'Descrição',
        age: 2,
        independence: 2,
        energy: 2,
        environment: 'WIDE',
        size: 'SMALL',
        requests: ['Ambiente amplo', 'Carinho'],
      })

    const existingPet = await prisma.pet.findFirst({
      where: {
        name: 'Maçã',
      },
    })

    const response = await request(app.server)
      .post(`/pictures/${existingPet!.id}`)
      .set('Authorization', `Bearer ${token}`)
      .attach(
        'files',
        path.resolve(__dirname, '../../../utils/tests/example.jfif'),
      )

    expect(response.statusCode).toEqual(201)

    const pet = await prisma.pet.findUnique({
      where: {
        id: existingPet!.id,
      },
      include: {
        pictures: true,
      },
    })

    expect(pet?.pictures).toEqual([
      expect.objectContaining({
        image_url: expect.any(String),
      }),
    ])
  })
})
