import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-organization.use-case'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization.repository'
import {
  OrganizationAlreadyExistsWithThisEmailError,
  OrganizationAlreadyExistsWithThisPhoneNumberError,
} from '@/errors/organization'

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterUseCase(organizationRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      cep: '00000-111',
      email: 'johncompany@example.com',
      name: 'John Doe',
      password: '123456',
      state: 'MG',
      city: 'Poços de Caldas',
      phone_number: '5535123456789',
      street_number: '20',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johncompany@example.com'

    await sut.execute({
      cep: '00000-111',
      email,
      name: 'John Doe',
      password: '123456',
      state: 'MG',
      city: 'Poços de Caldas',
      phone_number: '5535123456789',
      street_number: '20',
    })

    await expect(() =>
      sut.execute({
        cep: '00000-111',
        email: 'johncompany@example.com',
        name: 'John Doe',
        password: '123456',
        state: 'MG',
        city: 'Poços de Caldas',
        phone_number: '5535123456789',
        street_number: '20',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsWithThisEmailError)
  })

  it('should not be able to register with same phone number twice', async () => {
    const phone_number = '5535123456789'

    await sut.execute({
      cep: '00000-111',
      email: 'johncompany@example.com',
      name: 'John Doe',
      password: '123456',
      state: 'MG',
      city: 'Poços de Caldas',
      phone_number,
      street_number: '20',
    })

    await expect(() =>
      sut.execute({
        cep: '00000-111',
        email: 'johncompany2@example.com',
        name: 'John Doe',
        password: '123456',
        state: 'MG',
        city: 'Poços de Caldas',
        phone_number,
        street_number: '20',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsWithThisPhoneNumberError)
  })
})
