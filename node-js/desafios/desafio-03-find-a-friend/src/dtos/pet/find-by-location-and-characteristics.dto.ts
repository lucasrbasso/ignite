interface PetCharacteristics {
  age?: number
  independence?: number
  energy?: number
}

interface Location {
  state: string
  city: string
}

export interface FindByLocationAndCharacteristicsDTO {
  characteristics: PetCharacteristics
  location: Location
}
