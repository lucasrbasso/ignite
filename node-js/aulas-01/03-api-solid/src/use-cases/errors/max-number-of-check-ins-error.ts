import { BadRequestError } from './bad-request-error'

export class MaxNumberOfCheckInsError extends BadRequestError {
  constructor() {
    super('Max number of check-ins reached.')
  }
}
