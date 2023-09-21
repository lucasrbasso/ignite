import { BadRequestError } from './bad-request-error'

export class InvalidCredentialsError extends BadRequestError {
  constructor() {
    super('Invalid credentials.')
  }
}
