import { Organization, Prisma } from '@prisma/client'

export interface OrganizationRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByPhoneNumber(phone_number: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
