import { hash } from 'bcryptjs'

import { RegisterOrganizationDTO } from '@/dtos/organizations/register-organization.dto'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { RegisterOrganizationResponseDTO } from '@/dtos/organizations/register-organization-response.dto'
import {
  OrganizationAlreadyExistsWithThisEmailError,
  OrganizationAlreadyExistsWithThisPhoneNumberError,
} from '@/errors/organization'
import { logger } from '@/utils/logger'

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    cep,
    email,
    name,
    password,
    city,
    state,
    phone_number,
    street_number,
  }: RegisterOrganizationDTO): Promise<RegisterOrganizationResponseDTO> {
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    const organizationWithSamePhoneNumber =
      await this.organizationRepository.findByPhoneNumber(phone_number)

    if (organizationWithSameEmail) {
      logger.error(`c=RegisterUseCase m=execute f=organizationWithSameEmail`)
      throw new OrganizationAlreadyExistsWithThisEmailError()
    }

    if (organizationWithSamePhoneNumber) {
      logger.error(
        `c=RegisterUseCase m=execute f=organizationWithSamePhoneNumber`,
      )
      throw new OrganizationAlreadyExistsWithThisPhoneNumberError()
    }

    const password_hash = await hash(password, 6)

    const organization = await this.organizationRepository.create({
      cep,
      email,
      name,
      password_hash,
      city,
      state,
      phone_number,
      street_number,
    })

    return {
      organization,
    }
  }
}
