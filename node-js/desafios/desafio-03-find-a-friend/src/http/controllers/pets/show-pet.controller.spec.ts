import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Show pet by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list an organization by location and characteristics', async () => {
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
      .get(`/pets/${existingPet!.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Maçã',
        pictures: [],
      }),
    )
  })
})
