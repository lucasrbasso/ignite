import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/organizations').send({
      name: 'John Company',
      email: 'johndoe@company.com',
      cep: '34695039',
      city: 'Poços de Caldas',
      state: 'Minas Gerais',
      street_number: '30',
      phone_number: '5535123456789',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@company.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
