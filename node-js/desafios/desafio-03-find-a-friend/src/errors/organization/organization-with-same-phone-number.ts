export class OrganizationAlreadyExistsWithThisPhoneNumberError extends Error {
  constructor() {
    super('Phone number already exists')
  }
}
