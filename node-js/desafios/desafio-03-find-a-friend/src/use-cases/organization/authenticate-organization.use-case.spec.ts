import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { BadCredentialsError } from '@/errors/organization'
import { AuthenticateOrganizationUseCase } from './authenticate-organization.use-case'
import { hash } from 'bcryptjs'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationRepository.create({
      cep: '00000-111',
      email: 'johncompany@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone_number: '5535123456789',
      street_number: '20',
    })

    const { organization } = await sut.execute({
      email: 'johncompany@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization.name).toEqual('John Doe')
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(BadCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      cep: '00000-111',
      email: 'johncompany@example.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
      phone_number: '5535123456789',
      street_number: '20',
    })

    await expect(() =>
      sut.execute({
        email: 'johncompany@example.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(BadCredentialsError)
  })
})
