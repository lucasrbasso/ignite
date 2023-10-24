import { Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByPhoneNumber(phone_number: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        phone_number,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }
}
