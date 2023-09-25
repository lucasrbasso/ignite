import { BadRequestError } from './bad-request-error'

export class LateCheckInValidationError extends BadRequestError {
  constructor() {
    super(
      'The check-in can only be validated until 20 minutes from its creation.',
    )
  }
}
