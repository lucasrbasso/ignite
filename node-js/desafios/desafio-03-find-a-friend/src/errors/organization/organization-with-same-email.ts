export class OrganizationAlreadyExistsWithThisEmailError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
