import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'John Company',
      email: 'johndoe@company.com',
      cep: '34695039',
      city: 'Poços de Caldas',
      state: 'Minas Gerais',
      street_number: '30',
      phone_number: '5535123456789',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
