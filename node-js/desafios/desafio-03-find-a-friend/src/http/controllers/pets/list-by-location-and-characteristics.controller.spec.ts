import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'

describe('List pets by location and characteristics (e2e)', () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Abacaxi',
        about: 'Descrição',
        age: 1,
        independence: 3,
        energy: 3,
        environment: 'WIDE',
        size: 'SMALL',
        requests: ['Ambiente amplo', 'Carinho'],
      })

    const response = await request(app.server)
      .get('/pets')
      .query({
        state: 'Minas Gerais',
        city: 'Poços de Caldas',
        energy: 3,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Abacaxi',
      }),
    ])
  })
})
