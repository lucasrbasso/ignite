import { compare } from 'bcryptjs'
import { AuthenticateOrganizationResponseDTO } from '@/dtos/organizations/authenticate-organization-response.dto'
import { AuthenticateOrganizationDTO } from '@/dtos/organizations/authenticate-organization.dto'
import { BadCredentialsError } from '@/errors/organization'
import { OrganizationRepository } from '@/repositories/organization-repository'

export class AuthenticateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationDTO): Promise<AuthenticateOrganizationResponseDTO> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) {
      throw new BadCredentialsError()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new BadCredentialsError()
    }

    return {
      organization,
    }
  }
}
