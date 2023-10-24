import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PictureRepository } from '../picture-repository'

export class PrismaPictureRepository implements PictureRepository {
  async create(data: Prisma.PictureUncheckedCreateInput) {
    const picture = await prisma.picture.create({
      data,
    })

    return picture
  }

  async findByPetId(pet_id: string) {
    const pictures = await prisma.picture.findMany({
      where: {
        pet_id,
      },
    })

    return pictures
  }
}
