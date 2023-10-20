export class OrganizationAlreadyExistsWithThisPhoneNumber extends Error {
  constructor() {
    super('Phone number already exists')
  }
}
