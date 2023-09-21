import { BadRequestError } from './bad-request-error'

export class MaxDistanceError extends BadRequestError {
  constructor() {
    super('Max distance reached.')
  }
}
