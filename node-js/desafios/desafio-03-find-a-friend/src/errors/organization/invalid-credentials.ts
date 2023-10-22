export class BadCredentialsError extends Error {
  constructor() {
    super('Credências inválidas')
  }
}
