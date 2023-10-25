import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'John Company',
      email: 'johndoe@company.com',
      cep: '34695039',
      city: 'Poços de Caldas',
      state: 'Minas Gerais',
      street_number: '30',
      phone_number: '5535123456789',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@company.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
