import { Organization } from '@prisma/client'

export interface AuthenticateOrganizationResponseDTO {
  organization: Organization
}
