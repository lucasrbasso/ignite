import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization.repository'
import { AuthenticateOrganizationUseCase } from '@/use-cases/organizations/authenticate-organization.use-case'

export function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const useCase = new AuthenticateOrganizationUseCase(organizationsRepository)

  return useCase
}
