export interface RegisterPetDTO {
  name: string
  about: string
  age: number
  independence: number
  energy: number
  organization_id: string
  environment: 'WIDE' | 'SMALL'
  size: 'SMALL' | 'MEDIUM' | 'BIG'
  requests: string[]
}
