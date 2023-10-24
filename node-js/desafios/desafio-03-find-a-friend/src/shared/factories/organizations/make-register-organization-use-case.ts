import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization.repository'
import { RegisterOrganizationUseCase } from '@/use-cases/organizations/register-organization.use-case'

export function makeRegisterOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const useCase = new RegisterOrganizationUseCase(organizationsRepository)

  return useCase
}
