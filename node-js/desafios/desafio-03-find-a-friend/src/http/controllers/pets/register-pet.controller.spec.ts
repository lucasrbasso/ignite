import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'

describe('Register pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
