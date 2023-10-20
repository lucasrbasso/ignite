import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = []

  async findByPhoneNumber(phone_number: string) {
    const organization = this.items.find(
      (organization) => organization.phone_number === phone_number,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find(
      (organization) => organization.email === email,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: randomUUID(),
      confirmed: data.confirmed ?? false,
      name: data.name,
      email: data.email,
      street_number: data.street_number,
      cep: data.cep,
      phone_number: data.phone_number,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
