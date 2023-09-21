import { BadRequestError } from './bad-request-error'

export class ResourceNotFoundError extends BadRequestError {
  constructor() {
    super('Resource not found.')
  }
}
