import { Picture, Prisma } from '@prisma/client'
import { PictureRepository } from '../picture-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPictureRepository implements PictureRepository {
  public items: Picture[] = []

  async create(data: Prisma.PictureUncheckedCreateInput) {
    const picture = {
      id: randomUUID(),
      image_url: data.image_url,
      pet_id: data.pet_id || null,
    }

    this.items.push(picture)

    return picture
  }

  async findByPetId(id: string) {
    const pictures = this.items.filter((picture) => picture.pet_id === id)

    return pictures
  }
}
