export class OrganizationAlreadyExistsWithThisEmail extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
