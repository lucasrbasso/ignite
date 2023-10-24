import { Picture, Prisma } from '@prisma/client'

export interface PictureRepository {
  create(data: Prisma.PictureUncheckedCreateInput): Promise<Picture>
  findByPetId(id: string): Promise<Picture[]>
}
