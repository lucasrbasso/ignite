export class AWSIntegrationError extends Error {
  constructor() {
    super('A problem occurred while communicating with AWS')
  }
}
